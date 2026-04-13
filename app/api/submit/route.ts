import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const OWNER = "kylifornication-code";
const REPO = "the-infosec-wheel";
const SUBMISSIONS_PATH = "submissions";

export async function POST(req: NextRequest) {
  try {
    const { type, colorId, name, description, url, license } = await req.json();

    if (!type || !colorId || !name || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Submissions not configured" }, { status: 503 });
    }

    const octokit = new Octokit({ auth: token });
    const timestamp = Date.now();
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40);
    const filename = `${colorId}-${type}-${slug}-${timestamp}.md`;

    const validLicenses = ["open-source", "freemium", "commercial"];
    const resolvedLicense = validLicenses.includes(license) ? license : "freemium";

    const content = `---
type: ${type}
colorId: ${colorId}
name: ${name}
url: ${url || ""}
license: ${type === "tool" ? resolvedLicense : ""}
submittedAt: ${new Date().toISOString()}
status: pending
---

${description}
`;

    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: `${SUBMISSIONS_PATH}/${filename}`,
      message: `submission: ${type} "${name}" for ${colorId} team`,
      content: Buffer.from(content).toString("base64"),
    });

    return NextResponse.json({ success: true, filename });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
