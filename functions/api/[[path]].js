// The URL for the remote third party API you want to fetch from
// but does not implement CORS
const API_URL = 'https://api.evergame.club/api/';

export const onRequest = async (context) => {
  const url = context.request.url.replace(/https?:\/\/.+?\/api\//gi, API_URL);

  // Rewrite request to point to API URL. This also makes the request mutable
  // so you can add the correct Origin header to make the API server think
  // that this request is not cross-site.
  const request = new Request(url, context.request);
  request.headers.set('Origin', new URL('http://localhost:3000').origin);
  let response = await fetch(request);

  // Recreate the response so you can modify the headers
  response = new Response(response.body, response);

  // Remove CORS headers
  response.headers.delete('Access-Control-Allow-Origin');
  response.headers.delete('Access-Control-Allow-Credentials');

  return response;
};
