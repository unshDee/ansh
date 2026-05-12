/**
 * Physarum polycephalum (slime mold) simulation engine — browser runtime.
 *
 * This module is a lazy chunk: never import it eagerly. The component
 * dynamically import()s it only when animation is needed.
 *
 * Init + step logic is byte-identical to scripts/generate-posters.mjs so the
 * live animation picks up seamlessly from the static poster.
 *
 * References:
 *   Jeff Jones (2010) — "Characteristics of Pattern Formation and Evolution
 *     in Approximations of Physarum Transport Networks"
 *   Sage Jenson — https://sagejenson.com/physarum
 *   ertdfgcvb / zspotter — slime_dish
 *     https://play.ertdfgcvb.xyz/#/src/contributed/slime_dish
 */

import type { SlimeConfig } from './slime-ascii.types';

// ── Seeded RNG (mulberry32) — must match generate-posters.mjs exactly ─────────
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Uniform disk sampling — must match generate-posters.mjs exactly ───────────
function randCircle(rng: () => number): { x: number; y: number } {
  const r = Math.sqrt(rng());
  const theta = rng() * 2 * Math.PI;
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}

// ── Circular boundary ──────────────────────────────────────────────────────────
function bounded(
  x: number,
  y: number,
  W: number,
  H: number,
  charAspect: number,
  boundaryRadius: number,
): boolean {
  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W * charAspect, H) * boundaryRadius;
  const dx = (x - cx) * charAspect;
  const dy = y - cy;
  return dx * dx + dy * dy <= R * R;
}

// ── Sensing ────────────────────────────────────────────────────────────────────
function sense(
  trail: Float32Array,
  W: number,
  H: number,
  x: number,
  y: number,
  heading: number,
  angleOffset: number,
  dist: number,
  charAspect: number,
  boundaryRadius: number,
): number {
  const sx = x + dist * Math.cos(heading + angleOffset);
  const sy = y + dist * Math.sin(heading + angleOffset);
  const col = Math.floor(sx);
  const row = Math.floor(sy);
  if (!bounded(sx, sy, W, H, charAspect, boundaryRadius)) return -1;
  if (col < 0 || col >= W || row < 0 || row >= H) return -1;
  return trail[row * W + col];
}

// ── Public API ─────────────────────────────────────────────────────────────────
export async function createEngine(
  config: SlimeConfig,
): Promise<{ frame(): string }> {
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
    boundaryRadius: BOUNDARY_R = 0.48,
    charAspect: CHAR_ASPECT = 0.55,
    gamma: GAMMA = 1 / 3,
  } = config;

  const rng = mulberry32(seed);
  const trail = new Float32Array(W * H);
  const wip = new Float32Array(W * H);

  // Init agents — identical sequence to generate-posters.mjs
  const ax = new Float32Array(agentCount);
  const ay = new Float32Array(agentCount);
  const ah = new Float32Array(agentCount);

  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W * CHAR_ASPECT, H) * BOUNDARY_R;
  const Rx = R / CHAR_ASPECT;
  const Ry = R;

  for (let i = 0; i < agentCount; i++) {
    const circ = randCircle(rng);
    ax[i] = cx + circ.x * Rx * 0.9;
    ay[i] = cy + circ.y * Ry * 0.9;
    ah[i] = rng() * Math.PI * 2;
  }

  function step(frame: number): void {
    const isScattering =
      scatterPeriod > 0 && Math.sin(frame / scatterPeriod) > scatterThreshold;

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

      let fwd = sense(
        trail,
        W,
        H,
        x,
        y,
        h,
        0,
        SENS_DIST,
        CHAR_ASPECT,
        BOUNDARY_R,
      );
      let lft = sense(
        trail,
        W,
        H,
        x,
        y,
        h,
        -SENS_ANGLE,
        SENS_DIST,
        CHAR_ASPECT,
        BOUNDARY_R,
      );
      let rgt = sense(
        trail,
        W,
        H,
        x,
        y,
        h,
        SENS_ANGLE,
        SENS_DIST,
        CHAR_ASPECT,
        BOUNDARY_R,
      );

      if (isScattering) {
        if (fwd >= 0) fwd = 1 - fwd;
        if (lft >= 0) lft = 1 - lft;
        if (rgt >= 0) rgt = 1 - rgt;
      }

      let rotate = 0;
      if (fwd < 0) {
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

      if (bounded(nx, ny, W, H, CHAR_ASPECT, BOUNDARY_R)) {
        x = nx;
        y = ny;
      } else {
        h += Math.PI / 2;
      }

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

  // Fast-forward to match pre-rendered poster state, yielding every ~8 ms
  // so the main thread stays responsive and LCP can paint first.
  let fi = 0;
  while (fi < simIterations) {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    const deadline = performance.now() + 8;
    while (fi < simIterations && performance.now() < deadline) step(fi++);
  }

  // Live frame counter continues from where the poster left off
  let liveFrame = simIterations;

  const numTex = textureRows.length;
  const rampLen = textureRows[0].length;

  return {
    frame(): string {
      step(liveFrame++);

      const lines: string[] = [];
      for (let row = 0; row < H; row++) {
        let line = '';
        for (let col = 0; col < W; col++) {
          const v = Math.pow(trail[row * W + col], GAMMA);
          const texRow = (col + row) % numTex;
          const texCol = Math.min(rampLen - 1, Math.ceil(v * (rampLen - 1)));
          line += textureRows[texRow][texCol];
        }
        lines.push(line);
      }
      return lines.join('\n');
    },
  };
}
