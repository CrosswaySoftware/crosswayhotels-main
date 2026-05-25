import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const RSC_VARY =
  "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept, Accept-Encoding";

/**
 * After redirects/CDN, clients sometimes keep `Rsc: 1` but drop `?_rsc=…`.
 * Next then returns the flight payload instead of HTML — shown as raw JSON in the browser.
 */
function stripMisroutedRscHeaders(request: NextRequest): NextRequest {
  if (request.headers.get("RSC") !== "1" || request.nextUrl.searchParams.has("_rsc")) {
    return request;
  }

  const headers = new Headers(request.headers);
  headers.delete("RSC");
  headers.delete("Next-Router-State-Tree");
  headers.delete("Next-Router-Prefetch");
  headers.delete("Next-Router-Segment-Prefetch");
  return new NextRequest(request.url, { headers, method: request.method });
}

function applyPageResponseHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const isContact = /\/contact-us\/?$/.test(request.nextUrl.pathname);

  if (isContact) {
    response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
  }

  response.headers.set("Vary", RSC_VARY);
  return response;
}

export default function middleware(request: NextRequest) {
  const req = stripMisroutedRscHeaders(request);
  const response = intlMiddleware(req);
  return applyPageResponseHeaders(req, response);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en|fr)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
