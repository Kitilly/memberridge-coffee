import { landDots, MAP_BOUNDS } from "@/lib/data/land-dots";
import { MAP_H, MAP_W, TROPIC, mapX, mapY } from "@/lib/map-projection";

const DOT_R = (MAP_W / 360) * MAP_BOUNDS.step * 0.32;

/**
 * Static dotted world map of the coffee belt. A server component, so the
 * ~1,100 dots ship as markup rather than as client JavaScript.
 */
export function CoffeeBeltMap() {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto" role="img" aria-labelledby="map-title">
      <title id="map-title">World map of the coffee belt with Memberridge sourcing origins</title>
      <rect x={0} y={mapY(TROPIC)} width={MAP_W} height={mapY(-TROPIC) - mapY(TROPIC)} fill="var(--color-gold)" opacity={0.05} />
      {landDots.map(([lon, lat]) => (
        <circle
          key={`${lon},${lat}`}
          cx={mapX(lon)}
          cy={mapY(lat)}
          r={DOT_R}
          fill="var(--color-cream)"
          opacity={Math.abs(lat) <= TROPIC ? 0.42 : 0.14}
        />
      ))}
      {[TROPIC, 0, -TROPIC].map((lat) => (
        <g key={lat}>
          <line
            x1={0}
            x2={MAP_W}
            y1={mapY(lat)}
            y2={mapY(lat)}
            stroke="var(--color-gold)"
            strokeOpacity={lat === 0 ? 0.35 : 0.22}
            strokeDasharray="2 5"
            strokeWidth={0.6}
          />
          <text x={6} y={mapY(lat) - 3} fill="var(--color-gold)" fillOpacity={0.75} fontSize={6.5} letterSpacing={1.2}>
            {lat === 0 ? "EQUATOR" : lat > 0 ? "TROPIC OF CANCER" : "TROPIC OF CAPRICORN"}
          </text>
        </g>
      ))}
    </svg>
  );
}
