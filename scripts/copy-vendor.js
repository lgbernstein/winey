import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const files = [
  ["node_modules/promise-polyfill/dist/polyfill.min.js", "public/vendor/promise-polyfill.min.js"],
  ["node_modules/whatwg-fetch/dist/fetch.umd.js", "public/vendor/fetch.umd.js"],
  ["node_modules/regenerator-runtime/runtime.js", "public/vendor/regenerator-runtime.js"],
  ["node_modules/chart.js/dist/chart.umd.js", "public/vendor/chart.umd.js"]
];

for (const [source, destination] of files) {
  const vendorFile = resolve(destination);
  mkdirSync(dirname(vendorFile), { recursive: true });
  copyFileSync(resolve(source), vendorFile);
}
