import { NextResponse } from 'next/server';
import { adminAuth } from './helpers/firebase/firebaseAdmin';

export async function middleware(req) {
    const sessionCookie = req.cookies.get('session')?.value;
    const pathname = req.nextUrl.pathname;

    // Allow access to login and signup pages
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        return NextResponse.next();
    }

    if (!sessionCookie) {
        const url = new URL(`/login`, req.url);
        return NextResponse.redirect(url);
    }

    try {
        await adminAuth.verifyIdToken(sessionCookie);
        return NextResponse.next();
    } catch (error) {
        const url = new URL(`/login`, req.url);
        return NextResponse.redirect(url);
    }
}

// Define which paths this middleware should run for
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Example protected paths
};