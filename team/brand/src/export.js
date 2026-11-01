// node export.js  → renders every brand asset in kit.html to ../assets/*.png
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2400, height: 2000 } });
  await p.goto('file://' + path.join(__dirname, 'kit.html'));
  await p.waitForFunction(() => window.READY === true);
  const ids = await p.$$eval('body > .k', els => els.map(e => e.id));
  for (const id of ids) {
    const el = await p.$('#' + id);
    await el.screenshot({ path: path.join(__dirname, '..', 'assets', id + '.png'), omitBackground: id.startsWith('hl-') });
    console.log('ok', id);
  }
  await b.close();
})();
