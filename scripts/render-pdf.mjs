// Render a marketing route to a print-styled PDF, the same way the browser's
// "Print PDF" button does (print CSS + designed print-only components).
//
//   bun scripts/render-pdf.mjs <route> <output.pdf> [baseUrl]
//   bun scripts/render-pdf.mjs /cvs ../docs/business/CVS_SUMMARY.pdf
//
// Self-authenticates past the SITE_PASSWORD gate by computing the same signed
// access cookie the login route issues (see src/lib/site-auth.ts). Requires a
// running dev/preview server and a local Google Chrome.
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const route = process.argv[2] ?? "/cvs";
const outArg = process.argv[3] ?? "../docs/business/CVS_SUMMARY.pdf";
const baseUrl = process.argv[4] ?? "http://localhost:3000";
const outPath = path.resolve(__dirname, "..", outArg);

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const AUTH_COOKIE_NAME = "medscribe_site_access";
const ACCESS_PAYLOAD = "medscribe-site-access-v1";

const password = process.env.SITE_PASSWORD;
const cookies = [];
if (password) {
  const token = crypto
    .createHmac("sha256", password)
    .update(ACCESS_PAYLOAD)
    .digest("base64");
  cookies.push({
    name: AUTH_COOKIE_NAME,
    value: token,
    url: baseUrl,
  });
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
});
try {
  const page = await browser.newPage();
  if (cookies.length) await browser.setCookie(...cookies);
  const res = await page.goto(`${baseUrl}${route}`, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const finalUrl = page.url();
  if (finalUrl.includes("/login")) {
    throw new Error(
      `Redirected to login (${res?.status()}). Check SITE_PASSWORD is set in the env used to run this script.`,
    );
  }
  await page.pdf({
    path: outPath,
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
}
