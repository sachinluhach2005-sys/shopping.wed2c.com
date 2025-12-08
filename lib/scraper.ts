import * as cheerio from 'cheerio';

export interface ScrapedData {
    title: string;
    description: string;
    image: string;
    price: string;
    currency: string;
}

export async function scrapeProduct(url: string): Promise<ScrapedData | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.statusText}`);
            return null;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Generic OpenGraph extraction
        const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
        const ogDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        const ogImage = $('meta[property="og:image"]').attr('content') || '';

        // Attempt to find price (very generic, implementation may vary per site)
        // Trying json-ld first for structured data
        let price = '';
        let currency = '';

        const jsonLd = $('script[type="application/ld+json"]');
        jsonLd.each((i, el) => {
            try {
                const data = JSON.parse($(el).html() || '{}');
                if (data['@type'] === 'Product' || data['@type'] === 'ItemPage') {
                    const offer = data.offers || data.mainEntity?.offers;
                    if (offer) {
                        const priceVal = offer.price || offer.lowPrice || offer.highPrice;
                        if (priceVal) price = String(priceVal);
                        if (offer.priceCurrency) currency = offer.priceCurrency;
                    }
                }
            } catch (e) {
                // ignore
            }
        });

        // Fallback for price if not in json-ld
        if (!price) {
            // Look for common price classes/selectors
            const priceSelectors = [
                '[class*="price"]',
                '[id*="price"]',
                'meta[property="product:price:amount"]',
                'meta[property="og:price:amount"]'
            ];

            for (const selector of priceSelectors) {
                if (selector.startsWith('meta')) {
                    const val = $(selector).attr('content');
                    if (val) {
                        price = val;
                        break;
                    }
                } else {
                    const val = $(selector).first().text().trim();
                    // fast check if it looks like a price
                    if (val && /\d/.test(val)) {
                        price = val;
                        break;
                    }
                }
            }
        }

        // Cleanup price string
        if (price) {
            price = price.replace(/[^\d.,]/g, '');
        }

        // Final fallback: Check title for price
        if (!price || price === '0.00') {
            const priceMatch = ogTitle.match(/[\$£€¥](\d+[.,]\d{2})/);
            if (priceMatch) {
                price = priceMatch[1];
            }
        }

        return {
            title: ogTitle.trim(),
            description: ogDescription.trim(),
            image: ogImage,
            price: price || '0.00',
            currency: currency || 'USD'
        };

    } catch (error) {
        console.error('Scraping error:', error);
        return null;
    }
}
