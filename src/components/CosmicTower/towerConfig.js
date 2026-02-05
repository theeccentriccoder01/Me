// Centralized tower sizing config
// Ring radius (fixed) - keep this as the source of truth for ring size
export const RING_RADIUS = 25;

// Base (unscaled) floor width used to calculate story widths
export const BASE_FLOOR_WIDTH = 32;

// Compute tower scale so that tower width (BASE_FLOOR_WIDTH * TOWER_SCALE)
// matches the ring diameter (2 * RING_RADIUS). Do NOT change the ring size;
// changing RING_RADIUS will change the tower proportionally.
export const TOWER_SCALE = (RING_RADIUS * 2) / BASE_FLOOR_WIDTH;
