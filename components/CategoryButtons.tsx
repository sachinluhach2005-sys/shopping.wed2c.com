import Link from 'next/link';
import { Snowflake, Shirt, Footprints, Layers, Drama, Watch } from 'lucide-react';

export default function CategoryButtons() {
    const categories = [
        { name: 'Winter', query: 'hoodie+sweater+tracksuit', icon: Snowflake },
        { name: 'Shirts', query: 'shirt', icon: Shirt },
        { name: 'Pants', query: 'pant', icon: Layers },
        { name: 'Shoes', query: 'shoe', icon: Footprints },
        { name: 'Masks', query: 'mask', icon: Drama },
        { name: 'Accessories', query: 'sock+undergarment+belt+perfume+watch+boxer+brief', icon: Watch },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in w-full max-w-4xl mx-auto">
            {categories.map((cat) => (
                <Link
                    key={cat.name}
                    href={`/?q=${cat.query}#products`}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-6 text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 gap-2"
                >
                    <cat.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>{cat.name}</span>
                </Link>
            ))}
        </div>
    );
}
