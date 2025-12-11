import { NextResponse } from 'next/server';
import { getProducts, Product } from '@/lib/store';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const userMessage = (body.message || '').toLowerCase();

        // 1. Trust & Policy keywords
        if (userMessage.includes('shipping') || userMessage.includes('delivery') || userMessage.includes('arrive')) {
            return NextResponse.json({
                text: "We offer FAST and fully tracked shipping worldwide! Most orders arrive within 7-12 days. You'll receive a tracking number as soon as it ships. 🚚💨"
            });
        }
        if (userMessage.includes('return') || userMessage.includes('refund') || userMessage.includes('exchange')) {
            return NextResponse.json({
                text: "Buy with total confidence! We have a 30-day money-back guarantee. If you're not in love with it, simply return it for a full refund. 🛡️"
            });
        }
        if (userMessage.includes('trust') || userMessage.includes('legit') || userMessage.includes('real') || userMessage.includes('safe')) {
            return NextResponse.json({
                text: "Absolutely! We are a verified business with thousands of happy customers. We use secure 256-bit encryption for all payments (Stripe/PayPal). Your security is our #1 priority. 🔒"
            });
        }
        if (userMessage.includes('contact') || userMessage.includes('support') || userMessage.includes('email') || userMessage.includes('help')) {
            return NextResponse.json({
                text: "We're here to help 24/7! You can email our support team at support@shopwedc.com or use the 'Contact Us' form on the website. We usually reply within 1 hour! 💌"
            });
        }
        if (userMessage.includes('where') && (userMessage.includes('located') || userMessage.includes('from'))) {
            return NextResponse.json({
                text: "We are a global brand with warehouses in the USA, Europe, and Asia to ensure the fastest delivery to you! 🌍"
            });
        }
        if (userMessage.includes('payment') || userMessage.includes('card') || userMessage.includes('pay')) {
            return NextResponse.json({
                text: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. Typical secure checkout! 💳"
            });
        }
        if (userMessage.includes('track') || userMessage.includes('order')) {
            return NextResponse.json({
                text: "You can track your order directly on our website! Just click 'Track Order' in the menu and enter your order number. 📦"
            });
        }

        // 2. Greetings
        const greetings = ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'];
        if (greetings.some(g => userMessage === g || userMessage.startsWith(g + ' '))) {
            return NextResponse.json({
                text: "Hello! 👋 I'm your fashion expert. I can help you find trending outfits, check shipping, or search for specific items. What are you looking for today?"
            });
        }

        // 3. Product Search Logic
        // Clean message to get search tokens
        const cleanMessage = userMessage
            .replace(/i want/g, '')
            .replace(/looking for/g, '')
            .replace(/show me/g, '')
            .replace(/do you have/g, '')
            .trim();

        // Avoid searching for short/common noises
        if (cleanMessage.length < 3) {
            return NextResponse.json({
                text: "Could you tell me a bit more about what you're looking for? For example: 'winter jacket', 'black shoes', or 'party dress'."
            });
        }

        // Search products
        const products = await getProducts(cleanMessage);

        // Filter: Exclude already shown products
        const excludeIds: string[] = body.excludeIds || [];
        const availableProducts = products.filter(p => !excludeIds.includes(p.id));

        if (availableProducts.length > 0) {
            // Pick top 3 results
            const results = availableProducts.slice(0, 3);

            // Persuasive Response Templates
            const templates = [
                `I found some great options for you! These are trending right now:`,
                `Here are the best matches from our collection. Which one do you like?`,
                `You have great taste! Check out these top picks just for you:`,
                `I've curated these specific items based on what you asked for:`
            ];
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

            return NextResponse.json({
                text: randomTemplate,
                products: results
            });
        }

        // 4. Fallback / No Results
        return NextResponse.json({
            text: "I'm checking our inventory... I couldn't find an exact match for that right now. But our 'Celebrity Choice' collection is on fire! 🔥 Want to see our best sellers?",
            suggestion: "show best sellers"
        });

    } catch (e) {
        console.error('Chat API Error:', e);
        return NextResponse.json({ text: "I'm having a little trouble connecting to the warehouse. Please try again in a moment!" });
    }
}
