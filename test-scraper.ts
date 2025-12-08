import { scrapeProduct } from './lib/scraper';

async function run() {
    console.log("Scraping...");
    const data = await scrapeProduct('https://shopping.wed2c.com/s/2BfractgX78');
    console.log("Result:", data);
}

run();
