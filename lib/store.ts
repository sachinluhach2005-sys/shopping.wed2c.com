import fs from 'fs/promises';
import path from 'path';
import { supabase } from './supabase';

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

const USE_SUPABASE = !!supabase;

console.log(`[Store] Using storage: ${USE_SUPABASE ? 'Supabase Postgres' : 'Local File System'}`);

async function ensureDB() {
    if (USE_SUPABASE) return;
    try {
        await fs.access(DB_PATH);
    } catch {
        console.log('[Store] Creating new database file at:', DB_PATH);
        await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
    }
}

export async function getProducts(query?: string): Promise<Product[]> {
    if (USE_SUPABASE) {
        try {
            let queryBuilder = supabase!
                .from('products')
                .select('*')
                .order('addedAt', { ascending: false });

            if (query) {
                // Token-based search: Match ANY of the tokens in title OR description for Supabase
                // Note: Full AND logic on multiple columns is hard in Supabase simple query builder without raw SQL or TextSearch.
                // We use ".or()" which creates (col.ilike.a OR col.ilike.b).
                const tokens = query.split(/\s+/).filter(t => t.length > 0);
                if (tokens.length > 0) {
                    const orConditions = tokens.map(t => `title.ilike.%${t}%,description.ilike.%${t}%`).join(',');
                    queryBuilder = queryBuilder.or(orConditions);
                }
            }

            const { data, error } = await queryBuilder;

            if (error) throw error;
            return (data as Product[]) || [];
        } catch (e) {
            console.error('[Store] Supabase Get Error:', e);
            return [];
        }
    }

    // Local Fallback
    try {
        await ensureDB();
        const data = await fs.readFile(DB_PATH, 'utf-8');
        let products: Product[] = JSON.parse(data);

        if (query) {
            const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
            products = products.filter(p => {
                const text = (p.title + ' ' + p.description).toLowerCase();
                // "Analyze keywords": If user searches "blue hoodie", they want things that are BOTH blue AND hoodie.
                // AND logic is generally better for "finding that product".
                return tokens.every(token => text.includes(token));
            });
        }

        return products;
    } catch (error) {
        console.error('[Store] File Read Error:', error);
        return [];
    }
}

export async function addProduct(product: Product) {
    try {
        if (USE_SUPABASE) {
            // Check existence slightly differently or rely on unique constraint
            // But let's check manually to be safe and match previous logic
            const { data: existing } = await supabase!
                .from('products')
                .select('id')
                .eq('url', product.url)
                .single();

            if (existing) {
                console.log('[Store] Product already exists (Supabase):', product.url);
                return getProducts();
            }

            const { error } = await supabase!.from('products').insert(product);
            if (error) throw error;

            console.log('[Store] Product added to Supabase');
            return getProducts();
        }

        // Local Fallback
        const products = await getProducts();
        if (products.some(p => p.url === product.url)) {
            console.log('[Store] Product already exists:', product.url);
            return products;
        }

        const newProducts = [product, ...products];
        await fs.writeFile(DB_PATH, JSON.stringify(newProducts, null, 2));

        console.log('[Store] Product added locally');
        return newProducts;

    } catch (error) {
        console.error('[Store] Add Product Error:', error);
        throw error;
    }
}

export async function removeProduct(id: string) {
    try {
        if (USE_SUPABASE) {
            const { error } = await supabase!.from('products').delete().eq('id', id);
            if (error) throw error;
            console.log('[Store] Product removed from Supabase:', id);
            return getProducts();
        }

        // Local Fallback
        const products = await getProducts();
        const filtered = products.filter(p => p.id !== id);
        await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));

        console.log('[Store] Product removed locally:', id);
        return filtered;
    } catch (error) {
        console.error('[Store] Remove Product Error:', error);
        throw error;
    }
}
