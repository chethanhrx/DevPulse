export async function fetchHackerNewsData(query, signal) {
  const response = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story`,
    { signal }
  );

  if (response.status === 403 || response.status === 429) {
    throw {
      status: response.status,
      message: 'Hacker News API rate limit exceeded. Try again in a minute.',
    };
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: `Hacker News API error (${response.status}). Please try again.`,
    };
  }

  const data = await response.json();

  return (data.hits || []).slice(0, 5).map((item) => ({
    id: item.objectID,
    title: item.title,
    url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
    points: item.points,
    comments: item.num_comments,
    author: item.author,
    createdAt: item.created_at,
  }));
}
