#!/usr/bin/env node
/**
 * Physarum slime mold poster generator.
 *
 * Reads scripts/posters.manifest.json, runs a seeded simulation for each
 * entry, and writes the final ASCII frame to public/posters/{pageId}.txt.
 *
 * No external dependencies. Run via: node scripts/generate-posters.mjs
 *
 * Algorithm matches slime-engine.ts exactly (same seeded RNG, same boundary
 * logic, same scatter schedule) so the runtime animation is a seamless
 * continuation of the static poster.
 *
 * References:
 *   Jeff Jones (2010) — "Characteristics of Pattern Formation and Evolution
 *     in Approximations of Physarum Transport Networks"
 *   Sage Jenson — https://sagejenson.com/physarum
 *   ertdfgcvb / zspotter — slime_dish
 *     https://play.ertdfgcvb.xyz/#/src/contributed/slime_dish
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(__dirname, 'posters.manifest.json');
const OUT_DIR = path.join(ROOT, 'public', 'posters');

// ── Seeded RNG (mulberry32) ────────────────────────────────────────────────────
function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Uniform disk sampling ──────────────────────────────────────────────────────
function randCircle(rng) {
  const r = Math.sqrt(rng());
  const theta = rng() * 2 * Math.PI;
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}

// ── Circular boundary (correct for char aspect so it appears circular) ─────────
// monospace chars are ~0.55× as wide as tall; the boundary is an ellipse in
// grid space that maps to a circle in screen-pixel space.
const CHAR_ASPECT = 0.55;

function bounded(x, y, W, H) {
  const cx = W / 2;
  const cy = H / 2;
  // Radius in rows = half the screen height expressed in char-height units
  const R = Math.min(W * CHAR_ASPECT, H) * 0.48;
  const dx = (x - cx) * CHAR_ASPECT;
  const dy = y - cy;
  return dx * dx + dy * dy <= R * R;
}

// ── Sensing ────────────────────────────────────────────────────────────────────
function sense(trail, W, H, x, y, heading, angleOffset, dist) {
  const sx = x + dist * Math.cos(heading + angleOffset);
  const sy = y + dist * Math.sin(heading + angleOffset);
  const col = Math.floor(sx);
  const row = Math.floor(sy);
  if (!bounded(sx, sy, W, H)) return -1;
  if (col < 0 || col >= W || row < 0 || row >= H) return -1;
  return trail[row * W + col];
}

// ── Simulation ─────────────────────────────────────────────────────────────────
function runSim(config) {
  const {
    agentCount,
    sensorDistance: SENS_DIST,
    sensorAngle: SENS_ANGLE,
    agentAngle: AGT_ANGLE,
    agentSpeed: AGT_SPEED,
    decay: DECAY,
    minChem: MIN_CHEM,
    deposit: DEPOSIT,
    textureRows,
    gridWidth: W,
    gridHeight: H,
    simIterations,
    seed,
    scatterPeriod,
    scatterThreshold,
  } = config;

  const rng = mulberry32(seed);
  const trail = new Float32Array(W * H);
  const wip = new Float32Array(W * H);

  // Init agents — must match slime-engine.ts exactly for seamless hydration
  const ax = new Float32Array(agentCount); // x positions
  const ay = new Float32Array(agentCount); // y positions
  const ah = new Float32Array(agentCount); // headings

  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W * CHAR_ASPECT, H) * 0.48;
  const Rx = R / CHAR_ASPECT;
  const Ry = R;

  for (let i = 0; i < agentCount; i++) {
    const circ = randCircle(rng);
    ax[i] = cx + circ.x * Rx * 0.9;
    ay[i] = cy + circ.y * Ry * 0.9;
    ah[i] = rng() * Math.PI * 2;
  }

  function step(frame) {
    const isScattering = scatterPeriod > 0
      && Math.sin(frame / scatterPeriod) > scatterThreshold;

    // Diffuse + decay
    for (let row = 0; row < H; row++) {
      for (let col = 0; col < W; col++) {
        let sum = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < H && c >= 0 && c < W) {
              sum += trail[r * W + c];
            }
            // Out-of-bounds contributes 0 (no wrap — bounded domain)
          }
        }
        let val = DECAY * (sum / 9);
        if (val < MIN_CHEM) val = 0;
        wip[row * W + col] = val;
      }
    }
    trail.set(wip);

    // Sense → rotate → move → deposit
    for (let i = 0; i < agentCount; i++) {
      let x = ax[i];
      let y = ay[i];
      let h = ah[i];

      let fwd = sense(trail, W, H, x, y, h, 0, SENS_DIST);
      let lft = sense(trail, W, H, x, y, h, -SENS_ANGLE, SENS_DIST);
      let rgt = sense(trail, W, H, x, y, h, SENS_ANGLE, SENS_DIST);

      if (isScattering) {
        // Invert: flee trails
        if (fwd >= 0) fwd = 1 - fwd;
        if (lft >= 0) lft = 1 - lft;
        if (rgt >= 0) rgt = 1 - rgt;
      }

      let rotate = 0;
      if (fwd < 0) {
        // Out of bounds ahead — bounce
        rotate = Math.PI / 2;
      } else if (fwd >= lft && fwd >= rgt) {
        rotate = 0;
      } else if (fwd < lft && fwd < rgt) {
        rotate = rng() < 0.5 ? -AGT_ANGLE : AGT_ANGLE;
      } else if (lft < rgt) {
        rotate = AGT_ANGLE;
      } else if (rgt < lft) {
        rotate = -AGT_ANGLE;
      }

      h += rotate;

      const nx = x + Math.cos(h) * AGT_SPEED;
      const ny = y + Math.sin(h) * AGT_SPEED;

      if (bounded(nx, ny, W, H)) {
        x = nx;
        y = ny;
      } else {
        h += Math.PI / 2;
      }

      // Deposit
      const col = Math.floor(x);
      const row = Math.floor(y);
      if (col >= 0 && col < W && row >= 0 && row < H) {
        const idx = row * W + col;
        trail[idx] = Math.min(1, trail[idx] + DEPOSIT);
      }

      ax[i] = x;
      ay[i] = y;
      ah[i] = h;
    }
  }

  for (let iter = 0; iter < simIterations; iter++) step(iter);

  // Render final frame using alternating texture rows + cube-root remapping
  const numTex = textureRows.length;
  const rampLen = textureRows[0].length;
  const lines = [];

  for (let row = 0; row < H; row++) {
    let line = '';
    for (let col = 0; col < W; col++) {
      const raw = trail[row * W + col];
      const v = Math.pow(raw, 1 / 3);
      const texRow = (col + row) % numTex;
      const texCol = Math.min(rampLen - 1, Math.ceil(v * (rampLen - 1)));
      line += textureRows[texRow][texCol];
    }
    lines.push(line);
  }
  return lines.join('\n');
}

// ── Entry point ────────────────────────────────────────────────────────────────
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
for (const [pageId, config] of Object.entries(manifest)) {
  process.stdout.write(`  [slime] generating poster: ${pageId} ...`);
  const t0 = Date.now();
  const poster = runSim(config);
  fs.writeFileSync(path.join(OUT_DIR, `${pageId}.txt`), poster, 'utf8');
  console.log(` ${Date.now() - t0}ms`);
  count++;
}
console.log(`[slime] ${count} poster(s) → public/posters/`);
