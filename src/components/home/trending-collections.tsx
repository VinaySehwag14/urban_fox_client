"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Collection {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
    link: string;
}

const collections: Collection[] = [
    {
        id: 1,
        title: "Urban Nomad",
        subtitle: "Explore the collection",
        image: "/gallery/wear-waves-2.jpg",
        imageAlt: "Urban Nomad Collection",
        link: "/products?collection=urban-nomad",
    },
    {
        id: 2,
        title: "Coastal Cool",
        subtitle: "Explore the collection",
        image: "/looks/coastal-vibe.jpg",
        imageAlt: "Coastal Cool Collection",
        link: "/products?collection=coastal-cool",
    },
    {
        id: 3,
        title: "Monochrome Essentials",
        subtitle: "Explore the collection",
        image: "/carousel/summer-edit.jpg",
        imageAlt: "Monochrome Essentials Collection",
        link: "/products?collection=monochrome",
    },
    {
        id: 4,
        title: "Athleisure Edit",
        subtitle: "Explore the collection",
        image: "/gallery/wear-waves-1.jpg",
        imageAlt: "Athleisure Edit Collection",
        link: "/products?collection=athleisure",
    },
];

export default function TrendingCollections() {
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
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
                    Trending Collections
                </h2>
            </div>

            {/* Collections Grid */}
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:pb-0 scrollbar-hide">
                {collections.map((collection, index) => (
                    <Link
                        key={collection.id}
                        href={collection.link}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        className="group flex w-[80%] shrink-0 snap-center flex-col sm:w-auto"
                        style={{
                            opacity: visibleItems.has(index) ? 1 : 0,
                            transform: visibleItems.has(index)
                                ? "translateY(0)"
                                : "translateY(30px)",
                            transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
                        }}
                    >
                        {/* Image Container */}
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 shadow-md transition-all duration-300 group-hover:shadow-xl dark:bg-zinc-800">
                            <Image
                                src={collection.image}
                                alt={collection.imageAlt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* Text Content */}
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                {collection.title}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {collection.subtitle}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
