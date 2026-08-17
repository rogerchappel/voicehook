import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";

const readme = readFileSync("README.md", "utf8");
for (const command of [
  "npm ci",
  "npm run build",
  "npm install --global .",
  "voicehook help",
]) {
  if (!readme.includes(command)) {
    throw new Error(`README source-install instructions are missing: ${command}`);
  }
}

const workspace = mkdtempSync(join(tmpdir(), "voicehook-install-smoke-"));
const packageDirectory = join(workspace, "package");
const installPrefix = join(workspace, "install");
mkdirSync(packageDirectory);

try {
  const tarballName = execFileSync(
    "npm",
    ["pack", "--pack-destination", packageDirectory],
    { encoding: "utf8" },
  ).trim();
  const tarball = join(packageDirectory, tarballName);

  execFileSync("npm", ["install", "--global", "--prefix", installPrefix, tarball], {
    stdio: "inherit",
  });
  const output = execFileSync(join(installPrefix, "bin", "voicehook"), ["help"], {
    encoding: "utf8",
    env: { ...process.env, PATH: `${join(installPrefix, "bin")}${delimiter}${process.env.PATH}` },
  });
  if (!output.includes("voicehook ingest")) {
    throw new Error("installed CLI help did not contain the expected command summary");
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

console.log("Documented source install and packed CLI installation verified.");
