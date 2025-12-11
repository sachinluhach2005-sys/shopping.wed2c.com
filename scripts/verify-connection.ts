import * as dotenv from 'dotenv';
import path from 'path';

// Fix for ESM/Typescript hoisting: Load dotenv first
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
    console.log('--- Verifying Connection ---');
    console.log('Supabase URL Present:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key Present:', !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));

    // Dynamic import so lib/supabase reads the env vars we just loaded
    const { supabase } = await import('../lib/supabase');
    const { getProducts } = await import('../lib/store');

    if (supabase) {
        console.log('Supabase Client: INITIALIZED');
    } else {
        console.log('Supabase Client: NULL (Failed to initialize)');
    }

    const products = await getProducts();
    console.log(`Total Products Fetched: ${products.length}`);

    if (products.length > 0) {
        console.log('First Product:', products[0].title);
        console.log('Product Source Type:', products[0].isCelebrityChoice ? 'Celebrity Choice' : 'Standard');
    }
}

main();
