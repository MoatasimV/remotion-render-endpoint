#!/usr/bin/env ts-node
import { renderMedia } from "@remotion/renderer";
import { bundle } from "@remotion/bundler";
import { join } from "path";
import { writeFileSync, mkdtempSync } from "fs";
import { tmpdir } from "os";

interface Args {
  payload: string; // JSON string
  fps: number;
  width: number;
  height: number;
  out: string;
}

const argv = JSON.parse(process.argv[2]) as Args;

(async () => {
  // 1️⃣  Create a temporary entry with the payload baked in
  const temp = mkdtempSync(join(tmpdir(), "remotion-"));
  const entry = join(temp, "index.tsx");
  writeFileSync(
    entry,
    `import React from "react";
     import { registerRoot, Composition as C } from "remotion";
     import { Composition } from "${join(process.cwd(), "src/Composition").replace(/\\/g, "\\\\")}";
     registerRoot(() => (
       <C id="Main" component={Composition} durationInFrames={300} fps={${argv.fps}} width={${argv.width}} height=${argv.height} defaultProps={{ payload: ${argv.payload} }} />
     ));`
  );

  // 2️⃣  Bundle
  const entryPoint = await bundle({ entryPoint: entry });

  // 3️⃣  Render MP4
  await renderMedia({
    composition: "Main",
    serveUrl: entryPoint.serveUrl,
    codec: "h264",
    outputLocation: argv.out,
  });
})();