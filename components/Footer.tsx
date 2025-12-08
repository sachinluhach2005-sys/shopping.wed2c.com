import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ShoppingWed
                        </span>
                        <p className="text-sm text-gray-500">
                            Premium shopping experience curated just for you.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/#products">All Products</Link></li>
                            <li><Link href="/#products">New Arrivals</Link></li>
                            <li><Link href="/#products">Featured</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/shipping">Shipping Info</Link></li>
                            <li><Link href="/cancellation-refund">Cancellation & Refund</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} ShoppingWed. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
