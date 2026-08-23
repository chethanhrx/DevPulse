export async function fetchGithubData(query, signal) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=1`,
    {
      signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  if (response.status === 403 || response.status === 429) {
    throw {
      status: response.status,
      message: 'GitHub API rate limit exceeded. Try again in a minute.',
    };
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: `GitHub API error (${response.status}). Please try again.`,
    };
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const repo = data.items[0];

  // Fetch contributors count (best effort)
  let contributorsCount = 0;
  try {
    const contribResponse = await fetch(
      `${repo.contributors_url}?per_page=1`,
      {
        signal,
        headers: { 'Accept': 'application/vnd.github.v3+json' },
      }
    );

    if (contribResponse.ok) {
      const link = contribResponse.headers.get('link');
      if (link) {
        const match = link.match(/page=(\d+)>; rel="last"/);
        if (match) {
          contributorsCount = parseInt(match[1], 10);
        } else {
          contributorsCount = 1;
        }
      } else {
        const contribData = await contribResponse.json();
        contributorsCount = contribData.length;
      }
    }
  } catch {
    // Ignore contributor fetch errors - non-critical
  }

  return {
    name: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    language: repo.language,
    lastActivity: repo.updated_at,
    contributorsCount,
  };
}
