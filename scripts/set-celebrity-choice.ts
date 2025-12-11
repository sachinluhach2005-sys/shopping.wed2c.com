
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'products.json');

async function setCelebrityChoice() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        const products = JSON.parse(data);

        if (products.length === 0) {
            console.log('No products found.');
            return;
        }

        // Reset all first
        products.forEach((p: any) => p.isCelebrityChoice = false);

        // Pick 3 random indices
        const indices = new Set<number>();
        while (indices.size < 3 && indices.size < products.length) {
            indices.add(Math.floor(Math.random() * products.length));
        }

        indices.forEach(index => {
            products[index].isCelebrityChoice = true;
            console.log(`[Celebrity Choice] Set: ${products[index].title}`);
        });

        await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
        console.log('Successfully updated Celebrity Choice products.');

    } catch (error) {
        console.error('Error updating products:', error);
    }
}

setCelebrityChoice();
