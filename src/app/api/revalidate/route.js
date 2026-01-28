import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
    const secret = request.nextUrl.searchParams.get('secret');

    // Security: Only allow revalidation if the secret matches
    if (secret !== process.env.REVALIDATION_TOKEN) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        // This clears the cache for your main page
        // You can also use revalidateTag if you tagged your fetch
        revalidatePath('/', 'layout');
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
