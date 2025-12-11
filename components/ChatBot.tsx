'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Message {
    role: 'user' | 'bot';
    text: string;
    products?: any[];
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: "👋 Hi there! I'm your personal shopping assistant. Looking for something specific? or simply ask 'what is trendy?'" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsTyping(true);

        try {
            // Collect all previously shown product IDs
            const shownIds = messages
                .flatMap(m => m.products || [])
                .map(p => p.id);

            const res = await fetch('/api/chat-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    excludeIds: shownIds
                })
            });
            const data = await res.json();

            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: 'bot',
                text: data.text,
                products: data.products
            }]);
        } catch (e) {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble right now. Can you ask me that again?" }]);
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:shadow-blue-500/20"
                >
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    <span className="font-bold pr-1">Need Help?</span>
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[600px] h-[80vh]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                                    <Sparkles className="w-6 h-6 text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">ShopWedc Assistant</h3>
                                    <p className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full block animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950/50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm'
                                            }`}
                                    >
                                        <p>{msg.text}</p>

                                        {/* Product Cards Payload */}
                                        {msg.products && (
                                            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 snap-x">
                                                {msg.products.map((product: any) => (
                                                    <a
                                                        key={product.id}
                                                        href={product.url}
                                                        target="_blank"
                                                        className="min-w-[200px] w-[200px] snap-center bg-gray-50 dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors group"
                                                    >
                                                        <div className="aspect-video relative rounded-lg overflow-hidden mb-2">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.title}
                                                                fill
                                                                unoptimized
                                                                className="object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-xs line-clamp-2 h-8">{product.title}</h4>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-blue-600 font-bold text-xs">{product.currency} {product.price}</span>
                                                            <span className="text-[10px] bg-black text-white px-2 py-1 rounded-full whitespace-nowrap">Buy Now</span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about products..."
                                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
