export async function fetchStackExchangeData(query, signal) {
  const response = await fetch(`https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(query)}&site=stackoverflow&filter=withbody`, {
    signal
  });

  if (response.status === 403 || response.status === 429) {
    throw { status: response.status, message: 'Stack Exchange API rate limit exceeded. Try again shortly.' };
  }

  if (!response.ok) {
    throw { status: response.status, message: 'Failed to fetch Stack Exchange data' };
  }

  const data = await response.json();

  if (data.error_id && (data.error_id === 403 || data.error_id === 502)) {
     throw { status: 429, message: 'Stack Exchange API rate limit exceeded. Try again shortly.' };
  }
  
  return (data.items || []).slice(0, 5).map(item => ({
    id: item.question_id,
    title: item.title,
    url: item.link,
    score: item.score,
    answerCount: item.answer_count,
    viewCount: item.view_count,
    tags: item.tags,
    isAnswered: item.is_answered
  }));
}
