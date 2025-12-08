import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly to us when you use our website, including when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, and payment information.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Information</h2>
                            <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you order confirmations, and respond to your comments and questions.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Information Sharing</h2>
                            <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., sharing shipping info with carriers) or as required by law.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Security</h2>
                            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Cookies</h2>
                            <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at support@shoppingwed.com.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
