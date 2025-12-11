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
    isCelebrityChoice?: boolean;
}

// FORCE LOCAL STORAGE as per user request for "private project"
// This prevents connection to Supabase even if keys exist in .env
const FORCE_LOCAL_STORAGE = true;
const USE_SUPABASE = !FORCE_LOCAL_STORAGE && !!supabase;

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
                // Sort by Celebrity Choice first, then by Added Date
                .order('isCelebrityChoice', { ascending: false, nullsFirst: false })
                .order('addedAt', { ascending: false });

            if (query) {
                const tokens = query.split(/\s+/).filter(t => t.length > 0);
                if (tokens.length > 0) {
                    const orConditions = tokens.map(t => `title.ilike.%${t}%,description.ilike.%${t}%`).join(',');
                    queryBuilder = queryBuilder.or(orConditions);
                }
            }

            const { data, error } = await queryBuilder;

            if (error) throw error;
            return (data as Product[]) || [];
        } catch (e: any) {
            // Fallback: If "isCelebrityChoice" column is missing (Code 42703), load without sorting by it
            if (e.code === '42703') {
                console.warn("[Store] 'isCelebrityChoice' column missing in Supabase. Loading products without custom sort.");
                try {
                    let retryQuery = supabase!
                        .from('products')
                        .select('*')
                        .order('addedAt', { ascending: false });

                    if (query) {
                        const tokens = query.split(/\s+/).filter(t => t.length > 0);
                        if (tokens.length > 0) {
                            const orConditions = tokens.map(t => `title.ilike.%${t}%,description.ilike.%${t}%`).join(',');
                            retryQuery = retryQuery.or(orConditions);
                        }
                    }
                    const { data, error } = await retryQuery;
                    if (error) throw error;
                    return (data as Product[]) || [];

                } catch (retryError) {
                    console.error('[Store] Supabase Retry Error:', retryError);
                    return [];
                }
            }

            console.error('[Store] Supabase Get Error:', e);
            return [];
        }
    }

    // Local Fallback
    try {
        await ensureDB();
        const data = await fs.readFile(DB_PATH, 'utf-8');
        let products: Product[] = JSON.parse(data);

        // Define sort function to reuse
        // Define sort function to reuse
        const sortProducts = (a: Product, b: Product) => {
            // If searching/filtering (Category View), prioritize NEWEST first
            if (query) {
                return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
            }

            // Default (Home View): Priority 1: Celebrity Choice, Priority 2: Date
            if (a.isCelebrityChoice !== b.isCelebrityChoice) {
                return (a.isCelebrityChoice ? -1 : 1);
            }
            return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        };

        if (query) {
            const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
            products = products.filter(p => {
                const text = (p.title + ' ' + p.description).toLowerCase();
                // "Analyze keywords": If user searches "blue hoodie", they want things that are BOTH blue AND hoodie.
                // AND logic is generally better for "finding that product".
                // BUT for category buttons (e.g. "hoodie+sweater"), we want OR logic.
                // Given the user request, we switch to OR (some) to support the category buttons.
                return tokens.some(token => text.includes(token));
            });
        }

        return products.sort(sortProducts);
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

        const newProducts = [product, ...products]; // getProducts already sorts, but we add new one at top usually
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

export async function updateProduct(id: string, updates: Partial<Product>) {
    try {
        if (USE_SUPABASE) {
            const { error } = await supabase!
                .from('products')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            console.log('[Store] Product updated in Supabase:', id);
            return getProducts();
        }

        // Local Fallback
        const products = await getProducts();
        const updatedProducts = products.map(p =>
            p.id === id ? { ...p, ...updates } : p
        );

        await fs.writeFile(DB_PATH, JSON.stringify(updatedProducts, null, 2));
        console.log('[Store] Product updated locally:', id);
        return updatedProducts;
    } catch (error) {
        console.error('[Store] Update Product Error:', error);
        throw error;
    }
}
