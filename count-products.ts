import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

async function count() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        console.error("Missing credentials");
        return;
    }
    const supabase = createClient(url, key);

    const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Total products in DB:", count);
    }
}

count();
