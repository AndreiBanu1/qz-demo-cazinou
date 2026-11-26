import type { CSSProperties } from "react";
import { colors } from "@/config/theme.js";
import SceneSvg from "./SceneSvg";

// The building in cross-section, after the Hippodrome's facade drawn in points of light (docs/design.md). The floors
// follow the venue page's "how the salon is laid out" section: the gaming rooms upstairs (poker, table games, slots),
// the restaurant, bar and small stage on the ground floor, joined by stairs and a lift. On load the lights come on in
// waves, from the street up to the roof, and stay on. Nothing loops or flashes (Norme art. 80).

const BAIZE = "#1C5A45";
const WOOD = "#2E2212";
const WOOD_LIGHT = "#3A2A14";
const ROOF = "#1E1230";

/** When a light in wave `wave` (street → ground floor → upstairs → cornice → roof) comes on. */
const waveDelay = (wave: number, n = 0): CSSProperties => ({ animationDelay: `${200 + wave * 450 + n * 45}ms` });

type Light = { x: number; y: number; wave: number; r?: number };

const CHANDELIERS = [263, 390, 510];
const chandelierLights = (x: number): Light[] =>
  [
    [-22, 127],
    [-14, 120],
    [0, 117],
    [14, 120],
    [22, 127],
  ].map(([dx, y]) => ({ x: x + dx, y, wave: 2, r: 2.4 }));

const RIDGE = Array.from({ length: 9 }, (_, i) => 184 + i * 34).filter((x) => Math.abs(x - 320) > 14);
const CORNICE = Array.from({ length: 17 }, (_, i) => 76 + i * 30.5);
const SLOTS = [466, 492, 518, 544];
const RESTAURANT_TABLES = [226, 300];
const BAR_GLOBES = [360, 391, 422];
const STREET_LAMPS = [34, 606];

const LIGHTS: Light[] = [
  ...STREET_LAMPS.map((x) => ({ x, y: 311, wave: 0, r: 3.6 })),
  { x: 91, y: 340, wave: 0, r: 1.8 },
  { x: 91, y: 182, wave: 0, r: 1.8 },
  ...RESTAURANT_TABLES.flatMap((x) => [
    { x, y: 298, wave: 1, r: 2.8 },
    { x, y: 333, wave: 1, r: 1.8 },
  ]),
  ...BAR_GLOBES.map((x) => ({ x, y: 254, wave: 1, r: 3.4 })),
  ...CHANDELIERS.flatMap(chandelierLights),
  ...SLOTS.map((x) => ({ x, y: 177, wave: 2, r: 2 })),
  ...CORNICE.map((x) => ({ x, y: 106, wave: 3, r: 3 })),
  ...RIDGE.map((x) => ({ x, y: 40, wave: 4, r: 3.2 })),
];

// A step every 8 × 16 units, from the ground floor at x 196 up to the landing at x 116.
const STAIR_STEPS = Array.from({ length: 10 }, () => "v-16h-8").join("");

// Roof slopes: the x on the left slope at height y (the right slope mirrors it around x 320).
const slopeX = (y: number) => 62 + ((102 - y) * 98) / 62;

const Chandelier = ({ x }: { x: number }) => (
  <g stroke={colors.gilt} fill="none" strokeOpacity="0.9">
    <path d={`M${x} 110v10M${x} 120v16`} />
    <path d={`M${x - 22} 128q22 12 44 0M${x - 14} 121q14 7 28 0`} />
    {[-22, -11, 0, 11, 22].map((dx) => (
      <path key={dx} d={`M${x + dx} ${dx === 0 ? 136 : 131}v5`} strokeOpacity="0.5" />
    ))}
    <circle cx={x} cy="139" r="1.6" fill={colors.gilt} stroke="none" />
  </g>
);

const ArchedWindow = ({ x }: { x: number }) => (
  <g>
    <path d={`M${x - 8} 182V142a8 8 0 0 1 16 0v40Z`} fill={colors.night} fillOpacity="0.7" stroke={colors.gilt} strokeOpacity="0.45" />
    <path d={`M${x} 134v48M${x - 8} 160h16`} stroke={colors.gilt} strokeOpacity="0.3" />
  </g>
);

const Bottles = ({ shelf }: { shelf: number }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => {
      const x = 350 + i * 9.2;
      const h = 9 + ((i * 7) % 5);
      const fill = [colors.haze, colors.gilt, colors.orchid][i % 3];
      return (
        <g key={i} fill={fill} fillOpacity="0.65">
          <rect x={x} y={shelf - h} width="5" height={h} rx="1" />
          <rect x={x + 1.5} y={shelf - h - 5} width="2" height="5" />
        </g>
      );
    })}
  </g>
);

const VenueScene = ({ label }: { label: string }) => (
  <SceneSvg label={label}>
    <defs>
      <linearGradient id="venue-room" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.amethyst} stopOpacity="0.55" />
        <stop offset="1" stopColor={colors.nightSoft} />
      </linearGradient>
      <radialGradient id="venue-glow">
        <stop offset="0" stopColor={colors.gilt} stopOpacity="0.34" />
        <stop offset="1" stopColor={colors.gilt} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="venue-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.gilt} stopOpacity="0.28" />
        <stop offset="1" stopColor={colors.gilt} stopOpacity="0.03" />
      </linearGradient>
    </defs>

    {/* The night sky: a few still stars and a crescent moon */}
    {[
      [24, 30],
      [70, 62],
      [112, 18],
      [40, 150],
      [528, 16],
      [612, 92],
      [596, 180],
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill={colors.haze} fillOpacity="0.55" />
    ))}
    <path d="M604 20a15 15 0 1 0 12 26a12 12 0 1 1-12-26Z" fill={colors.gilt} fillOpacity="0.55" />

    {/* Mansard roof, slate courses, dormers, finials and the amethyst crest */}
    <path d="M62 102 160 40h320l98 62Z" fill={ROOF} stroke={colors.gilt} strokeWidth="2" />
    {[56, 72, 88].map((y) => (
      <path key={y} d={`M${slopeX(y).toFixed(1)} ${y}H${(640 - slopeX(y)).toFixed(1)}`} stroke={colors.gilt} strokeOpacity="0.16" />
    ))}
    {[210, 320, 430].map((x, i) => (
      <g key={x}>
        <path d={`M${x - 14} 88V62h28v26Z`} fill={ROOF} stroke={colors.gilt} strokeOpacity="0.85" />
        <path d={`M${x - 17} 62 ${x} 51l17 11`} fill="none" stroke={colors.gilt} />
        <ellipse cx={x} cy="75" rx="8" ry="9" fill={WOOD_LIGHT} stroke={colors.gilt} strokeOpacity="0.7" />
        <ellipse cx={x} cy="75" rx="8" ry="9" fill={colors.gilt} fillOpacity="0.45" className="scene-fade" style={waveDelay(3, i * 2)} />
        <path d={`M${x} 66v18M${x - 8} 75h16`} stroke={ROOF} strokeOpacity="0.8" />
      </g>
    ))}
    {[160, 480].map((x) => (
      <g key={x} stroke={colors.gilt}>
        <path d={`M${x} 40V28`} />
        <circle cx={x} cy="25" r="3" fill={colors.gilt} />
      </g>
    ))}
    <path d="M308 36q-12-3-20 3M332 36q12-3 20 3" stroke={colors.gilt} fill="none" />
    <path d="M320 12 333 25 320 40 307 25Z" fill={colors.amethyst} stroke={colors.gilt} strokeWidth="1.5" />
    <path d="M307 25h26M320 12v28M313 18.5 320 25l7-6.5" stroke={colors.orchid} strokeOpacity="0.7" fill="none" />

    {/* Cornice with dentils */}
    <rect x="58" y="102" width="524" height="8" fill={ROOF} stroke={colors.gilt} strokeWidth="1.5" />
    {Array.from({ length: 43 }, (_, i) => (
      <rect key={i} x={62 + i * 12} y="110" width="5" height="4" fill={colors.gilt} fillOpacity="0.45" />
    ))}

    {/* Upper floor: the landing, the poker room, the table games and the slot room */}
    <rect x="70" y="114" width="500" height="118" fill="url(#venue-room)" />
    <path d="M104 126H570M196 198H570" stroke={colors.gilt} strokeOpacity="0.22" />
    {CHANDELIERS.map((x, i) => (
      <circle key={x} cx={x} cy="128" r="48" fill="url(#venue-glow)" className="scene-fade" style={waveDelay(2, i * 5)} />
    ))}
    {[215, 311, 346, 434].map((x) => (
      <ArchedWindow key={x} x={x} />
    ))}
    {CHANDELIERS.map((x) => (
      <Chandelier key={x} x={x} />
    ))}
    {[330, 450].map((x) => (
      <rect key={x} x={x - 3} y="114" width="6" height="118" fill={ROOF} stroke={colors.gilt} strokeOpacity="0.55" />
    ))}

    {/* The poker room: a table with its rail, cards dealt face down and chairs around it */}
    {[235, 254, 272, 291].map((x) => (
      <path key={x} d={`M${x - 6} 200v-10a6 6 0 0 1 12 0v10`} fill={colors.night} stroke={colors.gilt} strokeOpacity="0.7" />
    ))}
    <ellipse cx="263" cy="207" rx="50" ry="12" fill={WOOD_LIGHT} stroke={colors.gilt} />
    <ellipse cx="263" cy="206" rx="43" ry="8.5" fill={BAIZE} stroke={colors.gilt} strokeOpacity="0.5" />
    {[235, 250, 263, 276, 291].map((x, i) => (
      <rect key={x} x={x - 2.5} y={i % 2 ? 206 : 203} width="5" height="3.5" rx="0.6" fill={colors.mist} fillOpacity="0.85" />
    ))}
    {[226, 250, 276, 300].map((x) => (
      <path key={x} d={`M${x - 7} 232v-12a7 7 0 0 1 14 0v12`} fill={colors.night} stroke={colors.gilt} strokeOpacity="0.8" />
    ))}

    {/* The table games: a roulette table with its wheel, no ball and no numbers */}
    <rect x="344" y="200" width="92" height="13" rx="6" fill={WOOD_LIGHT} stroke={colors.gilt} />
    <rect x="348" y="202" width="84" height="8" rx="4" fill={BAIZE} />
    <ellipse cx="359" cy="205.5" rx="9" ry="4" fill={WOOD} stroke={colors.gilt} />
    <ellipse cx="359" cy="205.5" rx="3" ry="1.4" fill={colors.gilt} fillOpacity="0.7" />
    <path d={Array.from({ length: 7 }, (_, i) => `M${376 + i * 8} 203v6`).join("")} stroke={colors.gilt} strokeOpacity="0.4" />
    <path d="M374 206h56" stroke={colors.gilt} strokeOpacity="0.4" />
    {[380, 404, 428].map((x) => (
      <path key={x} d={`M${x - 7} 232v-12a7 7 0 0 1 14 0v12`} fill={colors.night} stroke={colors.gilt} strokeOpacity="0.8" />
    ))}

    {/* The slot room: cabinets with blank screens, each with a stool */}
    {SLOTS.map((x) => (
      <g key={x}>
        <path d={`M${x - 10} 230v-44a10 8 0 0 1 20 0v44Z`} fill={colors.night} stroke={colors.gilt} strokeOpacity="0.85" />
        <rect x={x - 6} y="189" width="12" height="14" rx="1.5" fill={colors.haze} fillOpacity="0.22" stroke={colors.gilt} strokeOpacity="0.4" />
        <path d={`M${x - 7} 211h14M${x - 6} 216h12`} stroke={colors.gilt} strokeOpacity="0.45" />
        <ellipse cx={x} cy="222" rx="6" ry="2" fill={WOOD} stroke={colors.gilt} strokeOpacity="0.7" />
        <path d={`M${x} 224v8`} stroke={colors.gilt} strokeOpacity="0.6" />
      </g>
    ))}

    {/* The floor between the levels, open over the stairs, with a balustrade around the opening */}
    <path d="M70 232h8v10h-8ZM104 232h20v10h-20ZM196 232h374v10H196Z" fill={ROOF} stroke={colors.gilt} strokeOpacity="0.8" />
    <path d="M124 212H196" stroke={colors.gilt} strokeWidth="1.5" />
    <path d={Array.from({ length: 10 }, (_, i) => `M${130 + i * 7.5} 212v20`).join("")} stroke={colors.gilt} strokeOpacity="0.45" />

    {/* Ground floor */}
    <rect x="70" y="242" width="500" height="150" fill={colors.nightSoft} />

    {/* The lift, through both floors, and the stairs */}
    <rect x="78" y="114" width="26" height="278" fill="none" stroke={colors.gilt} strokeOpacity="0.5" />
    <path d="M91 114v230" stroke={colors.gilt} strokeOpacity="0.3" strokeDasharray="2 3" />
    <rect x="81" y="344" width="20" height="46" fill={WOOD} stroke={colors.gilt} />
    <rect x="81" y="186" width="20" height="44" fill="none" stroke={colors.gilt} strokeOpacity="0.6" />
    <path d="M91 186v44M91 346v44" stroke={colors.gilt} strokeOpacity="0.5" />
    <path d={`M196 392${STAIR_STEPS}v16L188 392Z`} fill={ROOF} stroke={colors.gilt} />
    <path d="M196 350 126 210M194 350v26" stroke={colors.gilt} strokeWidth="1.5" />
    <path d={Array.from({ length: 4 }, (_, i) => `M${188 - i * 16} ${334 - i * 32}v26`).join("")} stroke={colors.gilt} strokeOpacity="0.5" />

    {/* The restaurant: pictures on the wall, pendant lamps, laid tables with candles, chairs */}
    <path d="M196 336H326" stroke={colors.gilt} strokeOpacity="0.2" />
    <rect x="250" y="256" width="26" height="20" fill="none" stroke={colors.gilt} strokeOpacity="0.55" />
    <rect x="254" y="260" width="18" height="12" fill={colors.amethyst} fillOpacity="0.6" />
    {RESTAURANT_TABLES.map((x, i) => (
      <g key={x}>
        <circle cx={x} cy="322" r="34" fill="url(#venue-glow)" className="scene-fade" style={waveDelay(1, i * 2)} />
        <path d={`M${x} 242v48`} stroke={colors.gilt} strokeOpacity="0.6" />
        <path d={`M${x - 7} 297l4-7h6l4 7Z`} fill={colors.gilt} fillOpacity="0.8" />
        <path d={`M${x} 336v6`} stroke={colors.mist} strokeWidth="1.5" />
        <path d={`M${x - 16} 342h32l3 24h-38Z`} fill={colors.mist} fillOpacity="0.3" stroke={colors.mist} strokeOpacity="0.6" />
        <path d={`M${x - 3} 366v24h6v-24`} fill={WOOD} />
        {[-1, 1].map((side) => (
          <path
            key={side}
            d={`M${x + side * 26} 342v48M${x + side * 26} 364h${-side * 9}v26`}
            fill="none"
            stroke={colors.gilt}
            strokeOpacity="0.75"
          />
        ))}
      </g>
    ))}

    {/* Columns where the walls of the rooms above come down */}
    {[330, 452].map((x) => (
      <g key={x}>
        <rect x={x - 4} y="248" width="8" height="138" fill={ROOF} stroke={colors.gilt} strokeOpacity="0.5" />
        <path d={`M${x - 7} 242h14v6h-14ZM${x - 7} 386h14v6h-14Z`} fill={ROOF} stroke={colors.gilt} strokeOpacity="0.7" />
      </g>
    ))}

    {/* The bar: globe lamps, a mirrored back bar with bottles, the counter with glasses, stools */}
    <rect x="344" y="262" width="94" height="56" fill={colors.orchid} fillOpacity="0.1" stroke={colors.gilt} strokeOpacity="0.5" />
    <path d="M344 284h94M344 304h94" stroke={colors.gilt} strokeOpacity="0.7" />
    <Bottles shelf={284} />
    <Bottles shelf={304} />
    {BAR_GLOBES.map((x) => (
      <path key={x} d={`M${x} 242v8`} stroke={colors.gilt} strokeOpacity="0.6" />
    ))}
    {[362, 420].map((x) => (
      <path key={x} d={`M${x - 5} 318l5 7 5-7ZM${x} 325v4M${x - 3} 329h6`} fill="none" stroke={colors.haze} strokeOpacity="0.85" />
    ))}
    <rect x="338" y="329" width="106" height="6" fill={WOOD_LIGHT} stroke={colors.gilt} />
    <rect x="342" y="335" width="98" height="57" fill={WOOD} stroke={colors.gilt} strokeWidth="1.2" />
    <path d={[362, 382, 402, 422].map((x) => `M${x} 341v45`).join("")} stroke={colors.gilt} strokeOpacity="0.25" />
    {[356, 391, 426].map((x) => (
      <g key={x} stroke={colors.gilt} strokeOpacity="0.85">
        <ellipse cx={x} cy="352" rx="9" ry="2.5" fill={colors.night} />
        <path d={`M${x} 354.5V389M${x - 5} 375h10`} fill="none" />
        <ellipse cx={x} cy="390" rx="6" ry="1.5" fill={colors.night} />
      </g>
    ))}

    {/* The small stage: valance and curtains, two spotlights, a grand piano and a microphone */}
    {[
      [470, 498],
      [554, 526],
    ].map(([from, to], i) => (
      <g key={from}>
        <path d={`M${from - 5} 258h10l${to - from + 12} 106h-34Z`} fill="url(#venue-cone)" className="scene-fade" style={waveDelay(1, 4 + i * 2)} />
        <rect x={from - 5} y="254" width="10" height="7" rx="1.5" fill={colors.night} stroke={colors.gilt} />
      </g>
    ))}
    <path d="M462 250h30q-14 40-20 68 10 22 8 46h-18Z" fill={colors.amethyst} stroke={colors.gilt} strokeOpacity="0.7" />
    <path d="M566 250h-30q14 40 20 68-10 22-8 46h18Z" fill={colors.amethyst} stroke={colors.gilt} strokeOpacity="0.7" />
    <path d="M470 254q-4 30 2 64M558 254q4 30-2 64" stroke={colors.orchid} strokeOpacity="0.4" fill="none" />
    <circle cx="472" cy="318" r="2.6" fill={colors.gilt} />
    <circle cx="556" cy="318" r="2.6" fill={colors.gilt} />
    <path d="M458 242h112v8q-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0-7 8-14 0Z" fill={colors.amethyst} stroke={colors.gilt} />
    <path d="M486 342h28l8-16-36 16Z" fill={colors.night} stroke={colors.gilt} strokeOpacity="0.8" />
    <path d="M484 342h40v6h-40ZM488 348v16M520 348v16" fill={colors.night} stroke={colors.gilt} strokeOpacity="0.85" />
    <path d="M536 364v-30M531 364h10" stroke={colors.gilt} />
    <ellipse cx="536" cy="331" rx="2.4" ry="3.4" fill={colors.gilt} />
    <path d="M462 364h104v28H462Z" fill={WOOD} stroke={colors.gilt} strokeWidth="1.5" />
    <path d="M462 369h104" stroke={colors.gilt} strokeOpacity="0.4" />

    {/* Walls, quoins, the stone plinth and the street with its lamps */}
    <rect x="70" y="110" width="500" height="282" fill="none" stroke={colors.gilt} strokeWidth="2" />
    {Array.from({ length: 14 }, (_, i) => (
      <g key={i} fill="none" stroke={colors.gilt} strokeOpacity="0.4">
        <rect x={i % 2 ? 64 : 62} y={114 + i * 20} width={i % 2 ? 6 : 8} height="12" />
        <rect x="570" y={114 + i * 20} width={i % 2 ? 6 : 8} height="12" />
      </g>
    ))}
    <rect x="62" y="392" width="516" height="12" fill={ROOF} stroke={colors.gilt} strokeWidth="1.5" />
    <path
      d={Array.from({ length: 20 }, (_, i) => `M${75 + i * 26} 392v6M${88 + i * 26} 398v6`).join("") + "M62 398h516"}
      stroke={colors.gilt}
      strokeOpacity="0.3"
    />
    <path d="M14 404h612" stroke={colors.gilt} strokeWidth="2" />
    <path d="M14 412h612" stroke={colors.gilt} strokeOpacity="0.3" />
    <path d="M286 404v-4h68v4M292 400v-4h56v4" fill="none" stroke={colors.gilt} strokeOpacity="0.8" />
    {STREET_LAMPS.map((x) => (
      <g key={x}>
        <circle cx={x} cy="311" r="24" fill="url(#venue-glow)" className="scene-fade" style={waveDelay(0)} />
        <path d={`M${x} 404v-86M${x - 6} 404h12M${x - 3} 396h6`} stroke={colors.gilt} strokeWidth="1.5" />
        <path d={`M${x - 6} 318h12l-2-13h-8Z`} fill={colors.night} stroke={colors.gilt} />
        <path d={`M${x - 7} 305h14l-7-6Z`} fill={colors.gilt} />
      </g>
    ))}

    {/* The lights, in waves from the street up to the roof */}
    {LIGHTS.map((l, i) => {
      const n = LIGHTS.slice(0, i).filter((o) => o.wave === l.wave).length;
      return <circle key={i} cx={l.x.toFixed(1)} cy={l.y} r={l.r ?? 3} fill={colors.gilt} className="scene-warm" style={waveDelay(l.wave, n)} />;
    })}
  </SceneSvg>
);

export default VenueScene;
