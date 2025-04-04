export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (token && (request.nextUrl.pathname.startsWith("/signup") || request.nextUrl.pathname.startsWith("/signin"))) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/chatbot") ||
      request.nextUrl.pathname.startsWith("/conversations") ||
      request.nextUrl.pathname.startsWith("/documents") ||
      request.nextUrl.pathname.startsWith("/history"))
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
