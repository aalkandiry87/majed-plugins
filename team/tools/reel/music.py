#!/usr/bin/env python3
"""Original warm ambient bed, synthesized from scratch (no samples, no copyright).
usage: python3 music.py <seconds> <out.wav> [mood: dawn|rain|night]"""
import sys, wave, numpy as np

SR = 44100
dur = float(sys.argv[1]); out = sys.argv[2]; mood = sys.argv[3] if len(sys.argv) > 3 else 'dawn'
n = int(SR * dur); t = np.arange(n) / SR

def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
# I – V – vi – IV, voiced softly
prog = {
    'dawn':  [[60, 64, 67, 72], [55, 62, 67, 71], [57, 60, 64, 69], [53, 57, 60, 65]],   # C G Am F
    'rain':  [[57, 60, 64, 67], [53, 57, 60, 64], [60, 64, 67, 71], [55, 59, 62, 67]],   # Am F C G
    'night': [[62, 66, 69, 73], [59, 62, 66, 71], [55, 59, 62, 67], [57, 61, 64, 69]],   # D Bm G A
}[mood]
bar = 4.0
pad = np.zeros(n)
for i in range(int(np.ceil(dur / bar)) + 1):
    ch = prog[i % len(prog)]; s = int(i * bar * SR); e = min(n, int((i + 1) * bar * SR + 1.5 * SR))
    if s >= n: break
    tt = np.arange(e - s) / SR
    env = np.minimum(1, tt / 1.2) * np.exp(-np.maximum(0, tt - bar) / 0.6)
    for m in ch:
        f = midi(m - 12)
        pad[s:e] += env * (np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(2 * np.pi * 2 * f * tt + 0.3) + 0.12 * np.sin(2 * np.pi * 3.01 * f * tt)) / len(ch)
# gentle pluck arpeggio, 8th notes at 75 bpm
pl = np.zeros(n); step = 0.4
for k in range(int(dur / step)):
    ch = prog[int(k * step / bar) % len(prog)]; m = ch[[0, 2, 1, 3, 2, 1][k % 6]] + 12
    s = int(k * step * SR); L = min(n - s, int(1.6 * SR))
    if L <= 0: break
    tt = np.arange(L) / SR; f = midi(m)
    pl[s:s + L] += np.exp(-tt * 3.2) * (np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(4 * np.pi * f * tt)) * 0.22
mix = pad * 0.55 + pl * (0.5 if mood != 'night' else 0.35)
if mood == 'rain':  # soft filtered noise "rain"
    rng = np.random.default_rng(3); nz = rng.standard_normal(n)
    nz = np.convolve(nz, np.ones(24) / 24, mode='same'); mix += nz * 0.05
# fade in/out, normalize to about -16 dBFS peak-ish
fade = int(1.0 * SR); mix[:fade] *= np.linspace(0, 1, fade); mix[-fade * 2:] *= np.linspace(1, 0, fade * 2)
mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.45
st = np.stack([mix, np.roll(mix, int(0.012 * SR))], 1)
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
