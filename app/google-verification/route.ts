import { NextResponse } from 'next/server';

export async function GET() {
    // Replace this string with your actual Google Verification HTML content if needed
    // usually it's google-site-verification: google<hash>.html
    return new NextResponse('google-site-verification: CODE_GOES_HERE', {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
