
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Must use Service Role to bypass RLS if needed

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase keys in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const DB_PATH = path.join(process.cwd(), 'products.json');

async function pushToSupabase() {
    console.log('📦 Reading local products...');
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        const products = JSON.parse(data);
        console.log(`📊 Found ${products.length} products locally.`);

        // Determine if we need to batch this. 270 is small enough for one go, but let's do chunks of 50 to be safe.
        const chunkSize = 50;

        for (let i = 0; i < products.length; i += chunkSize) {
            const chunk = products.slice(i, i + chunkSize);
            console.log(`🚀 Uploading chunk ${i} - ${i + chunk.length}...`);

            // Clean data before insert if needed (e.g. ensure defaults)
            const cleanChunk = chunk.map((p: any) => ({
                id: p.id,
                url: p.url,
                title: p.title,
                description: p.description,
                image: p.image,
                price: p.price,
                currency: p.currency,
                addedAt: p.addedAt || new Date().toISOString(),
                isCelebrityChoice: p.isCelebrityChoice || false
            }));

            const { error } = await supabase
                .from('products')
                .upsert(cleanChunk, { onConflict: 'id' });

            if (error) {
                console.error('❌ Error uploading chunk:', error.message);
                if (error.code === '42703') {
                    console.error('🚨 The column "isCelebrityChoice" is missing in Supabase! Please run the SQL script first.');
                    process.exit(1);
                }
            } else {
                console.log('✅ Chunk uploaded.');
            }
        }

        console.log('🎉 All products synced to Supabase!');

    } catch (e) {
        console.error('❌ Script failed:', e);
    }
}

pushToSupabase();
