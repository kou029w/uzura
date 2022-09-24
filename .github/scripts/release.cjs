// @ts-check
const fs = require("node:fs/promises");
const crypto = require("node:crypto");

/** actions/github-script でのリリース成果物のアップロード */
module.exports = async function ({ image, version, github, context }) {
  const { data: release } = await github.rest.repos.createRelease({
    ...context.repo,
    tag_name: `v${version.replace(/^v/i, "")}`,
    prerelease: true,
    generate_release_notes: true,
  });
  const target = {
    ...context.repo,
    release_id: release.id,
  };
  const name = `uzura-${version}-amd64.img.gz`;
  const data = await fs.readFile(image);
  await github.rest.repos.uploadReleaseAsset({ ...target, name, data });
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  const body = `${release.body}

## USB Flash Drive Image

- ${name} (SHA256: \`${hash}\`)
`;
  await github.rest.repos.updateRelease({ ...target, body, prerelease: false });
};
