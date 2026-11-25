// Draws public/og-image.png (1200x630) from an SVG: the wordmark, the facets motif and the demo label (spec §8).
// Run by hand with `npm run og-image`; the PNG is committed. System fonts only.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const serif = "Georgia, 'Times New Roman', serif";
const sans = "Helvetica, Arial, 'DejaVu Sans', sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#1a1433" />
  <g transform="translate(900 150) scale(1.3)" fill="none" stroke="#FAC775" stroke-width="3" stroke-linejoin="round">
    <path d="M100 0 190 65 150 200 50 200 10 65Z" />
    <path d="M10 65h180M100 0l-40 65 40 135 40-135-40-65M60 65l-10 135M140 65l10 135" />
  </g>
  <text x="80" y="250" font-family="${serif}" font-size="110" fill="#FAC775">Salon Ametist</text>
  <text x="80" y="330" font-family="${sans}" font-size="36" fill="#EEEDFE">Restaurant, bar, muzică live și săli de joc</text>
  <text x="80" y="380" font-family="${sans}" font-size="36" fill="#CECBF6">Doar pentru adulți · 18+</text>
  <rect x="80" y="470" width="720" height="76" rx="14" fill="#FAEEDA" />
  <text x="112" y="519" font-family="${sans}" font-size="32" font-weight="700" fill="#412402">Site demonstrativ · local inventat</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ palette: true, quality: 80, colours: 64, compressionLevel: 9 })
  .toFile(join(root, "public", "og-image.png"));
console.log("wrote public/og-image.png");
