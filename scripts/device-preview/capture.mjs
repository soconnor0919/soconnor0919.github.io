// Requires the web directory served locally (README.md), never a remote renderer.
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const web = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const out = path.join(web, "device-cad/build");
const assets = path.join(web, "public/device/pearl-v5");
const base = process.argv[2] ?? "http://127.0.0.1:3110";
await mkdir(out, { recursive: true });
await mkdir(assets, { recursive: true });
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: [
    "--enable-webgl",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const failures = [];
try {
  const page = await browser.newPage();
  page.on("pageerror", (error) => failures.push(error.message));
  execFileSync(
    process.env.CAD_PYTHON ?? "python3",
    [path.join(web, "device-app/run.py")],
    { cwd: web, stdio: "inherit" },
  );
  execFileSync(
    process.env.CAD_PYTHON ?? "python3",
    [path.join(web, "scripts/device-preview/build-cad.py")],
    { cwd: web, stdio: "inherit" },
  );

  await page.setViewport({ width: 2400, height: 2400, deviceScaleFactor: 1 });
  for (const screen of ["home", "card", "connect", "recording"]) {
    await page.goto(
      `${base}/scripts/device-preview/render.html?screen=${screen}&capture=1`,
      { waitUntil: "networkidle0" },
    );
    await page.waitForFunction(() => window.cadReady === true);
    const data = await page.$eval(
      "canvas",
      (node) => node.toDataURL("image/png").split(",")[1],
    );
    const png = Buffer.from(data, "base64");
    await writeFile(path.join(out, `render-${screen}.png`), png);
    await sharp(png)
      .webp({ quality: 92 })
      .toFile(path.join(assets, `medscribe-sd-${screen}.webp`));
    await writeFile(
      path.join(assets, `medscribe-screen-${screen}.png`),
      await readFile(path.join(out, `screen-${screen}.png`)),
    );
  }
  assert.deepEqual(failures, []);
  const sha = async (filename) =>
    createHash("sha256")
      .update(await readFile(filename))
      .digest("hex");
  await writeFile(
    path.join(assets, "provenance.json"),
    JSON.stringify(
      {
        method:
          "Local WebGL rendering of a copied and rebranded CAD assembly. No image generation.",
        cadSource:
          "device-cad/source/assembly.glb — paperOne V22.5, copied from the sibling paperOS project",
        cadBuild: "scripts/device-preview/build-cad.py",
        screenSource: "device-app/app.c, built as an ABI 1 SD/Wasm package",
        screenType:
          "Actual 480x800 C/LVGL framebuffer capture of the SD/Wasm app executed by WAMR with illustrative host service fixtures",
        renderSource: "scripts/device-preview/render.html + render.mjs",
        captureCommand:
          "CAD_PYTHON=<Python with CAD dependencies> bun scripts/device-preview/capture.mjs",
        assemblySha256: await sha(path.join(out, "medscribe-assembled.glb")),
        homeScreenSha256: await sha(
          path.join(assets, "medscribe-screen-home.png"),
        ),
        homeRenderSha256: await sha(
          path.join(assets, "medscribe-sd-home.webp"),
        ),
        sdAppBuild: JSON.parse(
          await readFile(path.join(out, "sd-app-build.json"), "utf8"),
        ),
        sdAppExecution:
          "paperOS SD loader + WAMR + native C/LVGL; run-capture.c assertions",
        physicalHardwareVerified: false,
        waveform: "Explicitly simulated demo data; not microphone amplitude",
        finish: "Pale mint matte polymer grain and smaller deep teal inlays",
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "Ran actual SD/Wasm app, captured SDK screens, and rendered 4 CAD views. No runtime errors.",
  );
} finally {
  await browser.close();
}
