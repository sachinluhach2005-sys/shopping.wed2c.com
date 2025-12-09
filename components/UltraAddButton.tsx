'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, AlertCircle, CheckCircle2, Link as LinkIcon } from 'lucide-react';

interface UltraAddButtonProps {
    onAdd: (url: string) => Promise<void>;
}

export default function UltraAddButton({ onAdd }: UltraAddButtonProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setStatus('loading');
        setErrorMessage('');

        try {
            await onAdd(url);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setUrl('');
                setIsExpanded(false);
            }, 1500);
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to add product');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="flex justify-center w-full py-8">
            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.button
                        layoutId="ultra-button"
                        onClick={() => setIsExpanded(true)}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg shadow-xl overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-1000"
                            animate={{ backgroundPosition: ["0%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 100%" }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Add Product
                        </span>
                    </motion.button>
                ) : (
                    <motion.div
                        layoutId="ultra-button"
                        className="relative w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30"
                    >
                        {/* Animated Background Mesh */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[70%] bg-blue-500/20 rounded-full blur-[100px] animate-blob" />
                            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                        </div>

                        <div className="relative z-10 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-yellow-500" />
                                    New Collection Item
                                </h3>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <span className="sr-only">Close</span>
                                    <Plus className="w-6 h-6 rotate-45 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-1">
                                        Product URL
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[2px]" />
                                        <div className="relative flex bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 group-focus-within:border-transparent transition-colors">
                                            <div className="pl-4 flex items-center justify-center text-gray-400">
                                                <LinkIcon className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                placeholder="Paste the product link here..."
                                                className="w-full p-4 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={status === 'loading'}
                                    className={`
                                        w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all
                                        ${status === 'loading'
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25'
                                        }
                                    `}
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Scraping Magic...
                                        </span>
                                    ) : status === 'success' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Successfully Added!
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            Import Product
                                        </span>
                                    )}
                                </motion.button>

                                <AnimatePresence>
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errorMessage}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
