
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load env
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DB_PATH = path.join(process.cwd(), 'products.json');

async function syncProducts() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase credentials missing.');
        return;
    }

    console.log('Connecting to Supabase to fetch all products...');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all products, ordered by addedAt to avoid the "Celebrity Choice" column error
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('addedAt', { ascending: false });

    if (error) {
        console.error('❌ Supabase Error:', error.message);
        return;
    }

    console.log(`✅ Fetched ${products.length} products from Supabase.`);

    console.log('Saving to products.json...');
    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));

    console.log(`✅ Successfully saved ${products.length} products to local storage.`);
}

syncProducts();
