'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ShoppingWed
                            </span>
                        </Link>
                    </div>

                    <Suspense fallback={<div className="w-full max-w-md mx-4 h-10 bg-gray-50/50 rounded-full hidden md:block" />}>
                        <SearchBar />
                    </Suspense>

                    <nav className="flex items-center space-x-4">
                        <Link href="/admin" className="text-sm font-medium hover:text-blue-600 transition-colors">
                            Admin
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
