import { readFile } from 'node:fs/promises';

const manifestUrl = new URL('../src/version.json', import.meta.url);
const semanticVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

function versionFromTag(tag) {
  return String(tag).replace(/^v/, '');
}

async function publishedReleases(repository, headers) {
  const releases = [];
  // Read every page so an older stable release is not hidden by many previews.
  // Bound the lookup; fail explicitly instead of silently truncating the result.
  for (let page = 1; page <= 10; page++) {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=100&page=${page}`, {
      headers,
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      throw new Error(`GitHub returned HTTP ${response.status}; no release comparison was completed.`);
    }
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('GitHub returned an unexpected release response.');
    for (const release of batch) {
      if (release.draft || !release.published_at) continue;
      const publishedAt = Date.parse(release.published_at);
      if (!Number.isFinite(publishedAt) || typeof release.tag_name !== 'string') {
        throw new Error('GitHub returned a published release without a valid date or tag.');
      }
      releases.push({ ...release, publishedAt });
    }
    if (batch.length < 100) {
      return releases.sort((left, right) => right.publishedAt - left.publishedAt || right.id - left.id);
    }
  }
  throw new Error('More than 1,000 releases were returned; review pagination before comparing versions.');
}

try {
  const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(manifest.sourceRepo ?? '')) {
    throw new Error('src/version.json must contain a valid sourceRepo in owner/repository form.');
  }
  if (!semanticVersion.test(manifest.documentedVersion ?? '')) {
    throw new Error('documentedVersion must be a semantic version, including a prerelease suffix when appropriate.');
  }
  if (!['preview', 'stable'].includes(manifest.channel)) {
    throw new Error('channel must be preview or stable.');
  }
  if (typeof manifest.sourceRef !== 'string' || versionFromTag(manifest.sourceRef) !== manifest.documentedVersion) {
    throw new Error('sourceRef must name the exact release tag for documentedVersion.');
  }
  if (!/^\d+\.\d+\.\d+$/.test(manifest.stableVersion ?? '')) {
    throw new Error('stableVersion must record a stable semantic version.');
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'rateldesk-website-release-check',
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const releases = await publishedReleases(manifest.sourceRepo, headers);
  const latest = releases[0];
  const stable = releases.find((release) => !release.prerelease);
  if (!latest || !stable) throw new Error('GitHub did not return both a published release and a published stable release.');
  const target = manifest.channel === 'preview' ? latest : stable;
  const documentedRelease = releases.find((release) => release.tag_name === manifest.sourceRef);

  console.log(`Documented: ${manifest.documentedVersion} (${manifest.sourceRef}; ${manifest.channel} channel)`);
  console.log(`Latest published: ${latest.tag_name} (${latest.prerelease ? 'preview' : 'stable'}; ${latest.published_at})`);
  console.log(`Latest stable: ${stable.tag_name} (${stable.published_at})`);
  console.log(`Channel comparison: ${target.tag_name}`);
  console.log(`Source: https://github.com/${manifest.sourceRepo}/releases/tag/${encodeURIComponent(target.tag_name)}`);

  const drift = [];
  if (!documentedRelease) {
    drift.push(`The documented tag ${manifest.sourceRef} is not a published GitHub release.`);
  } else if ((manifest.channel === 'preview') !== Boolean(documentedRelease.prerelease)) {
    drift.push(`The documented release's GitHub prerelease flag disagrees with channel ${manifest.channel}.`);
  }
  if (manifest.sourceRef !== target.tag_name) {
    drift.push(`The documented tag differs from the latest release for the ${manifest.channel} channel.`);
  }
  if (manifest.stableVersion !== versionFromTag(stable.tag_name)) {
    drift.push(`Recorded stable ${manifest.stableVersion} differs from published stable ${stable.tag_name}.`);
  }

  if (drift.length) {
    for (const message of drift) console.error(message);
    console.error('Review the release changes before updating the manifests and documentation. No files were changed.');
    process.exitCode = 1;
  } else {
    console.log('The documented channel and recorded stable version match the published releases.');
  }
} catch (error) {
  console.error(`Release check unavailable: ${error.message}`);
  process.exitCode = 2;
}
