/**
 * Equirectangular strip covering the coffee belt, in SVG user units.
 * Bounds must match MAP_BOUNDS in data/land-dots.ts; they're repeated here so
 * client components can project pins without bundling the dot data.
 */
const LAT_MAX = 36;
const LAT_MIN = -36;

export const MAP_W = 1000;
export const MAP_H = (MAP_W * (LAT_MAX - LAT_MIN)) / 360;
export const TROPIC = 23.44;

export const mapX = (lon: number) => ((lon + 180) / 360) * MAP_W;
export const mapY = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H;
