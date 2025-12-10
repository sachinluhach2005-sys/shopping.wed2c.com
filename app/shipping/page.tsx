import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Shipping Processing Time</h2>
                            <p>All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Shipping Rates & Delivery Estimates</h2>
                            <p>Shipping charges for your order will be calculated and displayed at checkout. Standard delivery typically takes 3-7 business days depending on your location.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Shipment Confirmation & Order Tracking</h2>
                            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Customs, Duties and Taxes</h2>
                            <p>ShopWedc is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Damages</h2>
                            <p>ShopWedc is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
