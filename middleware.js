import { NextResponse } from 'next/server';

export async function middleware(req) {
    const sessionCookie = req.cookies.get('session')?.value;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/login')) {
        return NextResponse.next();
    }

    if (!sessionCookie) {
        const url = new URL(`/login`, req.url);
        return NextResponse.redirect(url);
    }

    try {
        const verifyUrl = `${req.nextUrl.origin}/api/auth/verify-middleware`;
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionCookie }),
        });

        const data = await response.json();

        if (data && data.isValid) {
            return NextResponse.next();
        } else {
            const url = new URL(`/login`, req.url);
            return NextResponse.redirect(url);
        }

    } catch (error) {
        console.error('Middleware verification error:', error);
        const url = new URL(`/login`, req.url);
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        '/',
        '/courses/:path*',
        '/counsellors/:path*',
        '/magazine/:path*',
        '/relax/:path*',
        '/shorts/:path*',
        '/tools/:path*',
        '/account/:path*',
    ],
};
