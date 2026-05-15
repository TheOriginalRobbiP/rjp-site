import { defineMiddleware } from 'astro:middleware';

// Pages that are already locale-specific — don't redirect these
const LOCALE_PREFIXES = ['/za'];

// Static assets and API routes — never redirect these
const SKIP_PREFIXES = ['/api', '/_astro', '/images', '/fonts', '/favicon'];

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Skip API routes, assets, and already-localised paths
  const shouldSkip =
    SKIP_PREFIXES.some((p) => pathname.startsWith(p)) ||
    LOCALE_PREFIXES.some((p) => pathname.startsWith(p));

  if (!shouldSkip) {
    // Cloudflare injects cf-ipcountry on every request
    const country =
      context.request.headers.get('cf-ipcountry') ||
      context.request.headers.get('x-vercel-ip-country');

    if (country === 'ZA') {
      // Redirect SA visitors to the /za landing page
      // Use 302 (temporary) so we can adjust routing logic later without
      // browsers caching a permanent redirect
      return Response.redirect(new URL('/za', context.url), 302);
    }
  }

  return next();
});
