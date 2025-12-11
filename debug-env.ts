
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const roleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- Debug Env ---');
console.log('URL present:', !!url, 'Length:', url?.length);
console.log('Role Key present:', !!roleKey, 'Length:', roleKey?.length);
console.log('Anon Key present:', !!anonKey, 'Length:', anonKey?.length);

import { supabase } from './lib/supabase';
console.log('Supabase Client Initialized:', !!supabase);
