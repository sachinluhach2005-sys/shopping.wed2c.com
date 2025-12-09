import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getProducts } from './lib/store';

async function test() {
    console.log("Searching for 'hoodie'...");
    const products = await getProducts('hoodie');
    console.log(`Found ${products.length} products:`);
    products.forEach(p => console.log(`- ${p.title}`));

    console.log("\nSearching for 'shirt'...");
    const shirts = await getProducts('shirt');
    console.log(`Found ${shirts.length} products:`);
}

test();
