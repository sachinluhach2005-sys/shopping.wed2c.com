import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, AlertCircle } from 'lucide-react';

export default function CancellationRefundPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Refund, Resend and Returns Policy
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <div className="prose prose-blue max-w-none dark:prose-invert">
                            <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-8">
                                At ShopWedc, we strive to provide the best possible shopping experience. Please review the following policies governing refunds, resends, and returns. If you have any issues, please contact our support team immediately.
                            </p>

                            <div className="grid gap-8">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                                        <AlertCircle className="w-6 h-6" />
                                        <h2 className="text-2xl font-semibold m-0">1. Orders Delayed</h2>
                                    </div>
                                    <p>
                                        Orders are considered delayed if tracking information is lacking, pending, or expired more than 60 days after counting from the date that the order departed from our warehouse.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                        <li><strong>USA:</strong> Counted 45 days after departure.</li>
                                        <li><strong>Brazil:</strong> Counted 110 days due to strict customs clearance.</li>
                                        <li><strong>Liquid Line:</strong> Counted 100 days for specific liquid shipping lines.</li>
                                    </ul>
                                    <p className="text-sm text-gray-500 italic">
                                        Note: Sometimes packages arrive at the nearest post office but are pending delivery due to insufficient address or unclaimed status. We recommend checking with your local post office.
                                    </p>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                                        <Truck className="w-6 h-6" />
                                        <h2 className="text-2xl font-semibold m-0">2. Orders Not Received</h2>
                                    </div>
                                    <p>
                                        We will not issue a refund or resend if the tracking information shows the order is delivered.
                                    </p>
                                    <p>
                                        If you do not receive the package despite it being marked as delivered, a non-delivery certification issued by the local post office is necessary.
                                    </p>
                                    <h3 className="text-lg font-medium mt-4">Tracking Alerts</h3>
                                    <p>We cannot offer a refund or resend if the package is destroyed or returned due to:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                                        <li>Incorrect/insufficient address</li>
                                        <li>No such number</li>
                                        <li>Refused by recipient</li>
                                        <li>Failure to pick up in time</li>
                                        <li>Uncleared customs</li>
                                    </ul>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                                        <ShieldCheck className="w-6 h-6" />
                                        <h2 className="text-2xl font-semibold m-0">3. Products Damaged</h2>
                                    </div>
                                    <p>
                                        <strong>Badly Damaged:</strong> We offer a full refund or a replacement.
                                    </p>
                                    <p>
                                        <strong>Partially Damaged:</strong> We offer a partial refund or replacement (except for minor issues like threads or slight wrinkles).
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Please provide photos or videos of the damaged item to prove damage within 7 days of receiving the product.
                                    </p>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Incorrect or Missing Products</h2>
                                    <p>We have a strict quality control process. However, if issues arise:</p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                        <li><strong>Incorrect Products:</strong> Full refund or replacement.</li>
                                        <li><strong>Wrong Color/Size:</strong> Refund or resend if you provide a screenshot/photo of the issue.</li>
                                        <li><strong>Missing Parts:</strong> Partial refund or resend of the missing part.</li>
                                        <li><strong>Missing Accessories:</strong> We will resend the accessories.</li>
                                    </ul>
                                </section>

                                <hr className="border-gray-100 dark:border-gray-700" />

                                <section className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Order Cancellation</h2>
                                    <p>
                                        For order cancellations, we offer a full refund <strong>before</strong> products are processed by warehouses.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                                        <li>Custom (POD) orders cannot be canceled after payment.</li>
                                        <li>Preorder inventory orders cannot be canceled after payment.</li>
                                    </ul>
                                </section>

                                <section className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mt-8">
                                    <h3 className="text-lg font-semibold mb-2">Unacceptable Disputes</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        We shall not accept unreasonable disputes, including but not limited to:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        <li>Buyer does not like the item.</li>
                                        <li>Item smells unusual.</li>
                                        <li>Buyer ordered wrong items or SKU.</li>
                                        <li>Shipping address provided incorrectly.</li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
