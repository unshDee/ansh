export interface SlimeConfig {
  agentCount: number;
  sensorDistance: number;
  /** Radians, e.g. Math.PI/4 (45°) */
  sensorAngle: number;
  /** Rotation amount when turning, e.g. Math.PI/4 */
  agentAngle: number;
  agentSpeed: number;
  decay: number;
  /** Zero out trails below this threshold (e.g. 0.0001) */
  minChem: number;
  deposit: number;
  /**
   * Alternating texture rows. `(col + row) % textureRows.length` picks the
   * row; trail value (gamma remapped) picks the character index within that
   * row. Match the reference's diagonal checkerboard look.
   */
  textureRows: string[];
  gridWidth: number;
  gridHeight: number;
  simIterations: number;
  seed: number;
  /** Scatter cycle period in frames — agents flee trails. 0 = disabled. */
  scatterPeriod: number;
  /** sin(frame/scatterPeriod) must exceed this to trigger scatter. */
  scatterThreshold: number;

  // ── Optional tuning ──────────────────────────────────────────────────────────
  /**
   * Fraction of the inscribed circle used as the agent boundary.
   * 0.48 = tight dish, 0.49 = fills more, >0.5 clips grid edges.
   * Default: 0.48
   */
  boundaryRadius?: number;
  /**
   * Monospace character width/height ratio. Adjusts boundary ellipse so the
   * dish looks circular on screen. Default: 0.55
   */
  charAspect?: number;
  /**
   * Gamma exponent applied to trail value before texture lookup.
   * Lower = brighter/more visible at low density. Default: 0.333 (cube root)
   */
  gamma?: number;
  /**
   * Target animation framerate. Default: 12
   */
  targetFps?: number;
}
