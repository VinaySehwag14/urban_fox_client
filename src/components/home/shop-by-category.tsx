"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
    image: string;
    imageAlt: string;
    link: string;
}

const categories: Category[] = [
    {
        id: 1,
        name: "T-shirts",
        image: "/carousel/summer-edit.jpg",
        imageAlt: "T-shirts Category",
        link: "/products?category=t-shirts",
    },
    {
        id: 2,
        name: "Hoodies",
        image: "/gallery/wear-waves-2.jpg",
        imageAlt: "Hoodies Category",
        link: "/products?category=hoodies",
    },
    {
        id: 3,
        name: "Sweatshirts",
        image: "/carousel/winter-collection.jpg",
        imageAlt: "Sweatshirts Category",
        link: "/products?category=sweatshirts",
    },
    {
        id: 4,
        name: "Oversized",
        image: "/gallery/wear-waves-1.jpg",
        imageAlt: "Oversized Category",
        link: "/products?category=oversized",
    },
];

export default function ShopByCategory() {
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        itemRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibleItems((prev) => new Set(prev).add(index));
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px",
                }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 md:text-3xl">
                    Shop By Category
                </h2>
            </div>

            {/* Categories Grid */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6 md:pb-0 scrollbar-hide">
                {categories.map((category, index) => (
                    <Link
                        key={category.id}
                        href={category.link}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        className="group relative aspect-[4/5] w-[70%] shrink-0 snap-center overflow-hidden rounded-2xl bg-zinc-900 shadow-md transition-all duration-300 hover:shadow-xl sm:w-[45%] md:w-auto"
                        style={{
                            opacity: visibleItems.has(index) ? 1 : 0,
                            transform: visibleItems.has(index)
                                ? "translateY(0)"
                                : "translateY(30px)",
                            transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
                        }}
                    >
                        {/* Background Image */}
                        <Image
                            src={category.image}
                            alt={category.imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Category Name */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-bold text-white md:text-xl">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
