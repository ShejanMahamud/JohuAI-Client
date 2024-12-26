import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Define the base path for protected routes
const protectedBasePath = ["/dashboard", "/chat"];
const authPages = ["/auth/signin", "/auth/signup"];
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is under the protected base path
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedBasePath.some((protectedPath) =>
    path.startsWith(protectedPath)
  );
  const isAuthPage = authPages.includes(path);
  // 3. Decrypt the session from the cookie
  const accessToken = (await cookies()).get("accessToken")?.value;

  // 4. Redirect to /auth/signin if the user is not authenticated
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
