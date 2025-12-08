import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CancellationPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold mb-8">Cancellation & Refund Policy</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Order Cancellation</h2>
                            <p>You may cancel your order within 24 hours of placement for a full refund. After 24 hours, if the order has not been shipped, you may still cancel but a processing fee may apply. Once shipped, orders cannot be cancelled.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Returns</h2>
                            <p>We accept returns on most items within 7 days of receipt. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Refunds</h2>
                            <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Exchanges</h2>
                            <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@shoppingwed.com.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
