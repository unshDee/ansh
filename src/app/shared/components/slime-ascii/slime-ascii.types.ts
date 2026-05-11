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
   * row; trail value (cube-root remapped) picks the character index within
   * that row. Match the reference's diagonal checkerboard look.
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
}
