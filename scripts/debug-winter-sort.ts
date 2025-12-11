
import { getProducts } from '../lib/store';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function debugWinterSort() {
    console.log('--- Debugging Winter Sort ---');

    // Simulate "Winter" query
    const query = 'hoodie sweater tracksuit';
    const products = await getProducts(query);

    console.log(`Found ${products.length} products for query: "${query}"`);
    console.log('Top 5 Results (Should be Newest First):');

    products.slice(0, 5).forEach((p, i) => {
        console.log(`${i + 1}. [${p.addedAt}] ${p.title} (ID: ${p.id})`);
    });

    // Check if truly sorted
    let isSorted = true;
    for (let i = 0; i < products.length - 1; i++) {
        const current = new Date(products[i].addedAt).getTime();
        const next = new Date(products[i + 1].addedAt).getTime();
        if (current < next) {
            console.error(`❌ Sort Error at index ${i}:`);
            console.log(`   Current: ${products[i].addedAt}`);
            console.log(`   Next:    ${products[i + 1].addedAt}`);
            isSorted = false;
            break;
        }
    }

    if (isSorted) {
        console.log('✅ List is correctly sorted by Date (Newest First).');
    }
}

debugWinterSort();
