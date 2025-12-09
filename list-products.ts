import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

async function list() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        console.error("Missing credentials");
        return;
    }

    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
        console.error(error);
        return;
    }

    console.log("Products in Supabase:");
    data.forEach(p => console.log(`- ${p.title} (ID: ${p.id})`));
}

list();
