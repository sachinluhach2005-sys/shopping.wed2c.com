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

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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

    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
