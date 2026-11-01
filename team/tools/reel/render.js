// usage: node render.js specs/<name>.json <out.mp4> [--preview]
// Renders a 1080x1920 30fps reel from a spec (no paid generation), then muxes an original synth bed.
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');

(async () => {
  const [specPath, outPath] = process.argv.slice(2);
  const preview = process.argv.includes('--preview');
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const FPS = 30;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.addInitScript(s => { window.SPEC = s; }, spec);
  await page.goto('file://' + path.join(__dirname, 'template.html'));
  await page.waitForFunction(() => window.READY === true);
  const total = await page.evaluate(() => window.TOTAL);

  if (preview) {
    const times = spec.previewAt || [1.5, total * 0.5, total - 1];
    for (const [i, t] of times.entries()) {
      await page.evaluate(t => window.renderAt(t), t);
      await page.screenshot({ path: outPath.replace(/\.mp4$/, `-p${i}.png`) });
    }
    await browser.close(); return;
  }

  const tmpVideo = outPath + '.video.mp4', wav = outPath + '.wav';
  execFileSync('python3', [path.join(__dirname, 'music.py'), String(total), wav, spec.mood || 'dawn']);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-crf', '19', '-movflags', '+faststart', tmpVideo]);
  const frames = Math.ceil(total * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate(t => window.renderAt(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  await browser.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmpVideo, '-i', wav, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k',
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-shortest', '-movflags', '+faststart', outPath]);
  fs.unlinkSync(tmpVideo); fs.unlinkSync(wav);
  console.log('done', outPath, total.toFixed(1) + 's');
})().catch(e => { console.error(e); process.exit(1); });
