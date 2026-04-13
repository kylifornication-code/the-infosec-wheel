#!/usr/bin/env node
/**
 * Processes pending submissions in /submissions/ and merges approved
 * entries into lib/community-data.json, then marks them as approved.
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SUBMISSIONS_DIR = join(ROOT, "submissions");
const COMMUNITY_DATA_PATH = join(ROOT, "lib", "community-data.json");

const VALID_TEAM_IDS = ["red", "orange", "yellow", "green", "blue", "purple", "white"];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const meta = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(": ");
    if (key && rest.length) meta[key.trim()] = rest.join(": ").trim();
  }
  meta.body = match[2].trim();
  return meta;
}

function updateFrontmatter(content, updates) {
  return content.replace(/^---\n([\s\S]*?)\n---/, (_, block) => {
    let updated = block;
    for (const [key, value] of Object.entries(updates)) {
      updated = updated.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: ${value}`);
    }
    return `---\n${updated}\n---`;
  });
}

async function main() {
  const files = (await readdir(SUBMISSIONS_DIR)).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("No submission files found.");
    return;
  }

  const communityData = JSON.parse(await readFile(COMMUNITY_DATA_PATH, "utf8"));
  let processed = 0;

  for (const file of files) {
    const filePath = join(SUBMISSIONS_DIR, file);
    const content = await readFile(filePath, "utf8");
    const meta = parseFrontmatter(content);

    if (!meta || meta.status !== "pending") continue;

    const { type, colorId, name, url, license, certifications, body } = meta;

    if (!VALID_TEAM_IDS.includes(colorId)) {
      console.warn(`Skipping ${file}: unknown colorId "${colorId}"`);
      continue;
    }
    if (!["tool", "team", "role"].includes(type)) {
      console.warn(`Skipping ${file}: unknown type "${type}"`);
      continue;
    }

    const description = body || "";
    const validLicenses = ["open-source", "freemium", "commercial"];
    const resolvedLicense = validLicenses.includes(license) ? license : "freemium";

    if (type === "tool") {
      communityData[colorId].tools.push({
        name,
        description,
        url: url || "",
        license: resolvedLicense,
        tags: ["community"],
      });
    } else if (type === "team") {
      communityData[colorId].teams.push({ name, description });
    } else if (type === "role") {
      const certList = certifications
        ? certifications.split(",").map((c) => c.trim()).filter(Boolean)
        : [];
      communityData[colorId].roles.push({
        title: name,
        description,
        certifications: certList,
      });
    }

    // Mark as approved
    const updated = updateFrontmatter(content, { status: "approved" });
    await writeFile(filePath, updated, "utf8");

    console.log(`Approved: ${file} (${type} → ${colorId})`);
    processed++;
  }

  if (processed > 0) {
    await writeFile(COMMUNITY_DATA_PATH, JSON.stringify(communityData, null, 2) + "\n", "utf8");
    console.log(`Updated community-data.json with ${processed} new entries.`);
  } else {
    console.log("No pending submissions to process.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
