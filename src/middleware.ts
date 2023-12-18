import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/") {
    console.log("heheh");
    // return NextResponse.redirect(request.nextUrl.origin);
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
  matcher: ["/auth/:path*", "/admin/:path*"],
};

// ==================================

// matcher: ["/auth/:path*", "/admin/:path*", "/dashboard/:path*"],
//

//   if (request.nextUrl.pathname === "/dashboard") {
//     return NextResponse.redirect(request.nextUrl.origin + "/dashboard/account");
//   }

//   if (request.nextUrl.pathname === "/dashboard/users") {
//     return NextResponse.redirect(request.nextUrl.origin + "/dashboard/users/subscriptions");
//   }

// console.log(request.nextUrl.pathname);

//   console.log("hello");
//   if (!request.nextUrl.pathname.startsWith("/admin") && role === "admin") {
//     return NextResponse.redirect(request.nextUrl.origin + "/admin");
//   }