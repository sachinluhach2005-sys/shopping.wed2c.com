'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setQuery(q);
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md mx-4 hidden md:block">
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    suppressHydrationWarning
                    className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 bg-blue-600 text-white rounded-full opacity-0 group-focus-within:opacity-100 transition-all hover:bg-blue-700"
                >
                    <Search className="w-3 h-3" />
                </button>
            </div>
        </form>
    );
}
