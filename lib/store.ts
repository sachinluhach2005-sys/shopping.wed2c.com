import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';

const DB_PATH = path.join(process.cwd(), 'products.json');

export interface Product {
    id: string;
    url: string;
    title: string;
    description: string;
    image: string;
    price: string;
    currency: string;
    addedAt: string;
}

// Check if we are in an environment with Vercel KV configured
const USE_KV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function ensureDB() {
    if (USE_KV) return; // KV doesn't need file init
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
    }
}

export async function getProducts(): Promise<Product[]> {
    if (USE_KV) {
        try {
            const products = await kv.get<Product[]>('products');
            return products || [];
        } catch (e) {
            console.error('KV Error:', e);
            return [];
        }
    }

    await ensureDB();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function addProduct(product: Product) {
    const products = await getProducts();
    // Avoid duplicates by URL
    if (products.some(p => p.url === product.url)) {
        return products;
    }
    const newProducts = [product, ...products];

    if (USE_KV) {
        await kv.set('products', newProducts);
    } else {
        await fs.writeFile(DB_PATH, JSON.stringify(newProducts, null, 2));
    }

    return newProducts;
}

export async function removeProduct(id: string) {
    const products = await getProducts();
    const filtered = products.filter(p => p.id !== id);

    if (USE_KV) {
        await kv.set('products', filtered);
    } else {
        await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));
    }

    return filtered;
}
