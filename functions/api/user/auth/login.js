// The URL for the remote third party API you want to fetch from
// but does not implement CORS
const API_URL = 'https://api.evergame.club/api/';

export const onRequestPost = async () => {
  const response = await fetch(API_URL + 'user/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      address: 'THxevzJGgG7VtCDH5Dfa6THRu7FHznWM8B',
    }),
  });
  const data = await response.json();

  return new Response(JSON.stringify(data));
};
