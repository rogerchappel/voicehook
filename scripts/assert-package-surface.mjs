import { execFileSync } from "node:child_process";

const [manifest] = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }),
);

if (!manifest?.files) {
  throw new Error("npm pack did not return a package manifest");
}

const files = new Map(manifest.files.map((file) => [file.path, file]));
const requiredFiles = [
  "dist/src/cli.js",
  "dist/src/index.js",
  "dist/src/index.d.ts",
  "fixtures/voicehook.config.json",
  "fixtures/transcripts/demo.jsonl",
  "fixtures/transcripts/plain.txt",
  "examples/capture-inbox.config.json",
  "examples/opencLaw-inbox.config.json",
];

for (const path of requiredFiles) {
  if (!files.has(path)) {
    throw new Error(`required package file is missing: ${path}`);
  }
}

const testArtifacts = [...files.keys()].filter(
  (path) => path.startsWith("dist/test/") || path.startsWith("test/"),
);
if (testArtifacts.length > 0) {
  throw new Error(`test artifacts found in package: ${testArtifacts.join(", ")}`);
}

if ((files.get("dist/src/cli.js").mode & 0o111) === 0) {
  throw new Error("packaged CLI is not executable");
}

console.log(`Package surface verified (${manifest.entryCount} files).`);
