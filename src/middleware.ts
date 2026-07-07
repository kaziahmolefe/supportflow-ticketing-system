import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

    const session =
        request.cookies.get("supportflow-session");

    const { pathname } = request.nextUrl;

    // Allow login page and login/logout APIs
    if (
        pathname === "/login" ||
        pathname.startsWith("/api/login") ||
        pathname.startsWith("/api/logout") ||
        pathname.startsWith("/_next") ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    // Protect everything else
    if (!session) {

        return NextResponse.redirect(
            new URL("/login", request.url)
        );

    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!.*\\..*).*)",
    ],
};