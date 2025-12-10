import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Use License</h2>
                            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ShopWedc's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. User Account</h2>
                            <p>If you create an account on this website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Governing Law</h2>
                            <p>Any claim relating to ShopWedc's website shall be governed by the laws of the jurisdiction in which the company is based without regard to its conflict of law provisions.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Disclaimer</h2>
                            <p>The materials on ShopWedc's website are provided on an 'as is' basis. ShopWedc makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
