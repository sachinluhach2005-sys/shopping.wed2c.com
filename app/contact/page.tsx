import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                        <section className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Us</h2>
                                <p>For any inquiries or support, please email us at:</p>
                                <a href="mailto:support@shoppingwed.com" className="text-blue-600 hover:underline">support@shoppingwed.com</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
