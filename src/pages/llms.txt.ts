import llmsContent from '../llms.txt?raw';

export const prerender = false;

export async function GET() {
  return new Response(llmsContent, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
