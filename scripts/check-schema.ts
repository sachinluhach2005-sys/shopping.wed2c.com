
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Manual config load
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkSchema() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase credentials missing in .env.local');
        return;
    }

    console.log('Connecting to Supabase...');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try to select the specific column
    // We limit to 1 to just check if the query parsing works
    const { data, error } = await supabase
        .from('products')
        .select('isCelebrityChoice')
        .limit(1);

    if (error) {
        console.error('❌ Error selecting column:', error.message);
        console.error('Error Code:', error.code);
        if (error.code === '42703') {
            console.log('🚨 DIAGNOSIS: The column "isCelebrityChoice" DOES NOT EXIST in your Supabase table.');
            console.log('👉 ACTION REQUIRED: Go to Supabase Dashboard -> Table Editor -> products -> Add Column "isCelebrityChoice" (Boolean, Default: false)');
        }
    } else {
        console.log('✅ Column "isCelebrityChoice" exists and is accessible.');
    }
}

checkSchema();
