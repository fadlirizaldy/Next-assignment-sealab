import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (request.nextUrl.pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(request.nextUrl.origin + "/auth/login");
  }

  if (
    ["/subscription/amateur", "/subscription/pro", "/subscription/rookie"].includes(request.nextUrl.pathname) &&
    !token
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/auth/login");
  }

  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(request.nextUrl.origin + "/auth/login");
  }

  if (["/auth/login", "/auth/register"].includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(request.nextUrl.origin);
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(request.nextUrl.origin);
  }

  // if (request.nextUrl.origin === "http://localhost:3000" && role === "admin") {
  //   return NextResponse.redirect(request.nextUrl.origin + "/admin");
  // }
  return NextResponse.next();
}

// tempat middleware di run
export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/profile/:path*", "/subscription/:path*"],
};

// ==================================
