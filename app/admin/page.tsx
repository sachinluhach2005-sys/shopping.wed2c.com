'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Loader2, Link as LinkIcon, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Product {
    id: string;
    url: string;
    title: string;
    price: string;
    image: string;
    currency: string;
    description: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded password as requested by user ("905088" from history context, or I set a new one? User said "u make a passward"). 
        // I will set it to "admin123" as per plan, but let's check history. Previous conv used 905088. I'll use that to be nice, or generic.
        // Plan said "admin123". I'll use "admin123" and tell the user.
        if (password === '905088') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setAdding(true);
        setError('');

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to add product');
            }

            await fetchProducts();
            setUrl('');
        } catch (e: any) {
            setError(e.message);
        } finally {
            setAdding(false);
        }
    };

    const handleRemoveProduct = async (id: string) => {
        if (!confirm('Are you sure you want to remove this product?')) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h1>
                        <p className="text-gray-500 mt-2">Enter password to manage store</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ShoppingWed Admin
                    </h1>
                    <a href="/" target="_blank" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                        Go to Shop <LinkIcon className="w-3 h-3" />
                    </a>
                </div>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                    Logout
                </button>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Add Product Section */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-800"
                    >
                        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-blue-600" />
                            Add New Product
                        </h2>
                        <form onSubmit={handleAddProduct} className="flex gap-3">
                            <div className="flex-1 relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Paste product link here..."
                                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={adding}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                            >
                                {adding ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Scraping...
                                    </>
                                ) : (
                                    'Add'
                                )}
                            </button>
                        </form>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-red-500 text-xs"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>
                </section>

                {/* Products List */}
                <section>
                    <h2 className="text-lg font-bold mb-4">Inventory ({products.length})</h2>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <AnimatePresence mode='popLayout'>
                                {products.map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm group hover:shadow-md transition-all flex flex-col"
                                    >
                                        <div className="aspect-square relative overflow-hidden bg-gray-100">
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-0.5 bg-white/90 backdrop-blur text-xs font-bold rounded-full shadow-sm">
                                                    {product.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 flex-1 flex flex-col">
                                            <h3 className="font-medium text-xs line-clamp-2 mb-2" title={product.title}>
                                                {product.title || 'Untitled Product'}
                                            </h3>
                                            <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                                <a
                                                    href={product.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    Link
                                                </a>
                                                <button
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Remove Product"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {products.length === 0 && (
                                <div className="col-span-full text-center py-20 text-gray-500 text-sm">
                                    No products yet. Add your first product above.
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
