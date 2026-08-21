// Capture the long-form homepage in both system color schemes.
//
//   bun scripts/capture-homepage.mjs [baseUrl] [outputDirectory]
//
// Requires a running local server and Google Chrome. If SITE_PASSWORD is set,
// the script uses the same signed access cookie as the login route.
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const outputDirectory = path.resolve(process.argv[3] ?? "output");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const password = process.env.SITE_PASSWORD;

await fs.mkdir(outputDirectory, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
});

async function capture({ name, width, height, colorScheme }) {
  const page = await browser.newPage();

  try {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: colorScheme },
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);

    if (password) {
      const value = crypto
        .createHmac("sha256", password)
        .update("medscribe-site-access-v1")
        .digest("base64");
      await browser.setCookie({
        name: "medscribe_site_access",
        value,
        url: baseUrl,
      });
    }

    await page.goto(baseUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    if (page.url().includes("/login")) {
      throw new Error("Homepage capture was redirected to /login.");
    }

    await page.addStyleTag({
      content:
        ".pitch-lazy{content-visibility:visible!important}*{animation:none!important;transition:none!important}",
    });

    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(
      () => Array.from(document.images).every((image) => image.complete),
      { timeout: 30_000 },
    );

    const layout = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    }));
    if (layout.scrollWidth > layout.clientWidth) {
      throw new Error(
        `${name} has horizontal overflow: ${layout.scrollWidth}px > ${layout.clientWidth}px`,
      );
    }

    const destination = path.join(outputDirectory, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
    console.log(`${name}: ${layout.clientWidth} × ${layout.scrollHeight}`);
  } finally {
    await page.close();
  }
}

try {
  for (const colorScheme of ["light", "dark"]) {
    await capture({
      name: `homepage-${colorScheme}`,
      width: 1440,
      height: 1000,
      colorScheme,
    });
    await capture({
      name: `homepage-${colorScheme}-mobile`,
      width: 390,
      height: 844,
      colorScheme,
    });
  }
} finally {
  await browser.close();
}
