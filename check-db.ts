import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

async function check() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        console.error("Missing credentials in .env.local");
        return;
    }

    console.log("Connecting to:", url);
    const supabase = createClient(url, key);

    const { data, error } = await supabase.from('products').select('*').limit(1);

    if (error) {
        console.error("Connection Failed:", error.message);
        if (error.message.includes('relation "products" does not exist')) {
            console.error("CRITICAL: Table 'products' is missing!");
        }
        return;
    }

    console.log("Connection Successful! Table 'products' found.");
    console.log("Rows:", data.length);

    // Test Write Permission
    console.log("Testing Write Permission...");
    const { data: insertData, error: insertError } = await supabase
        .from('products')
        .insert({
            id: '00000000-0000-0000-0000-000000000000',
            url: 'https://test.com',
            title: 'Test Product'
        })
        .select();

    if (insertError) {
        console.error("WRITE FAILED:", insertError.message);
        console.error("Hint: You might need to disable RLS or add a policy.");
    } else {
        console.log("WRITE SUCCESSFUL!");
        // Cleanup
        await supabase.from('products').delete().eq('id', '00000000-0000-0000-0000-000000000000');
    }
}

check();
