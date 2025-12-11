
import { updateProduct, getProducts } from '../lib/store';
import { config } from 'dotenv';
import { resolve } from 'path';

// Fix for .env loading
config({ path: resolve(process.cwd(), '.env.local') });

async function verifyToggle() {
    console.log('--- Verifying Product Update ---');

    // 1. Get a product
    const products = await getProducts();
    if (products.length === 0) {
        console.error('No products found to test.');
        return;
    }

    const target = products[0];
    console.log(`Target Product: ${target.title} (ID: ${target.id})`);
    console.log(`Initial Status: ${target.isCelebrityChoice}`);

    // 2. Toggle Status
    const newStatus = !target.isCelebrityChoice;
    console.log(`Toggling to: ${newStatus}`);

    await updateProduct(target.id, { isCelebrityChoice: newStatus });

    // 3. Verify Update
    const updatedProducts = await getProducts();
    const updatedTarget = updatedProducts.find(p => p.id === target.id);

    if (updatedTarget?.isCelebrityChoice === newStatus) {
        console.log('✅ SUCCESS: Status updated correctly.');
    } else {
        console.error('❌ FAILURE: Status did not update.');
        console.log('Current Status:', updatedTarget?.isCelebrityChoice);
    }

    // 4. Revert
    console.log('Reverting changes...');
    await updateProduct(target.id, { isCelebrityChoice: target.isCelebrityChoice });
    console.log('Reverted.');
}

verifyToggle();
