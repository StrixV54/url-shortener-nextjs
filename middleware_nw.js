import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_JWT_SECRET,
    });
    const isIndexpage = request.nextUrl.pathname === "/";
    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    console.log(request.nextUrl.pathname, isIndexpage, isAuthRoute, isGuestRoute, token?.status === 202);
    if (isIndexpage && !token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!token && isAuthRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // if (token && isGuestRoute) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url));
    // }
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

const authRoutes = ["/dashboard"];
const guestRoutes = ["/login", "/register"];
