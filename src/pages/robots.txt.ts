export const prerender = false;

export async function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://rjp.digital/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
