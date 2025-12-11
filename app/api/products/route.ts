import { NextResponse } from 'next/server';
import { getProducts, addProduct, removeProduct, Product } from '@/lib/store';
import { scrapeProduct } from '@/lib/scraper';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const products = await getProducts();
        return NextResponse.json(products);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Scrape the product
        const scraped = await scrapeProduct(url);

        if (!scraped) {
            return NextResponse.json({ error: 'Failed to scrape product. Please check the link.' }, { status: 400 });
        }

        const newProduct: Product = {
            id: uuidv4(),
            url,
            ...scraped,
            addedAt: new Date().toISOString()
        };

        const updatedProducts = await addProduct(newProduct);
        return NextResponse.json(updatedProducts);

    } catch (e: any) {
        console.error('[API] POST Error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updatedProducts = await removeProduct(id);
        return NextResponse.json(updatedProducts);

    } catch (e: any) {
        console.error('[API] DELETE Error:', e);
        return NextResponse.json({ error: e.message || 'Failed to delete product' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updatedProducts = await import('@/lib/store').then(m => m.updateProduct(id, updates));

        return NextResponse.json(updatedProducts);
    } catch (e: any) {
        console.error('[API] PATCH Error:', e);
        return NextResponse.json({ error: e.message || 'Failed to update product' }, { status: 500 });
    }
}
