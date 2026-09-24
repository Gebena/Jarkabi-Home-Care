import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/icons", { recursive: true });

const svg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="#1a2b4a"/>
  <circle cx="256" cy="256" r="140" fill="none" stroke="#c9a96e" stroke-width="12"/>
  <path d="M180 280 Q256 200 332 280" fill="none" stroke="#7d9b8a" stroke-width="10"/>
  <text x="256" y="380" text-anchor="middle" fill="#f8f5f0" font-family="Georgia, serif" font-size="48" font-weight="600">JH</text>
</svg>`;

for (const size of [192, 512]) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(`public/icons/icon-${size}.png`);
}

console.log("Generated PWA icons in public/icons/");
