import { readFileSync } from "node:fs";

const release = readFileSync(".github/workflows/release.yml", "utf8");
const dryRun = readFileSync(".github/workflows/release-dry-run.yml", "utf8");

const requiredReleaseDefinitions = [
  ["tag trigger", /tags:\s*\n\s*- ['"]v\*\.\*\.\*['"]/],
  ["npm registry configuration", /registry-url:\s*https:\/\/registry\.npmjs\.org/],
  ["trusted-publishing permission", /id-token:\s*write/],
  ["npm provenance publication", /run:\s*npm publish --provenance\b/],
];

for (const [description, pattern] of requiredReleaseDefinitions) {
  if (!pattern.test(release)) {
    throw new Error(`release workflow is missing ${description}`);
  }
}

const verificationIndex = release.indexOf("npm run release:check");
const publicationIndex = release.indexOf("npm publish --provenance");
if (verificationIndex === -1 || publicationIndex <= verificationIndex) {
  throw new Error("npm publication must follow release verification");
}

if (/npm publish\b/.test(dryRun)) {
  throw new Error("release dry run must never publish to npm");
}

console.log("Release workflow publication contract verified.");
