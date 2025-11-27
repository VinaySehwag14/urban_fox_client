"use client";

import Image from "next/image";
import Link from "next/link";

interface LookCard {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
}

const looks: LookCard[] = [
    {
        id: 1,
        title: "Urban Explorer Set",
        description: "Master the elements with this all-in-one look. Engineered for Urban Exploration. Designed.",
        buttonText: "Shop The Set",
        buttonLink: "/products?collection=urban-explorer",
        image: "/looks/urban-explorer.jpg",
        imageAlt: "Urban Explorer Set",
    },
    {
        id: 2,
        title: "Coastal Vibe Outfit",
        description: "Effortless style for everyday days. Pair this Essential Tee with Seriously Minimalist Shorts.",
        buttonText: "Get This Look",
        buttonLink: "/products?collection=coastal-vibe",
        image: "/looks/coastal-vibe.jpg",
        imageAlt: "Coastal Vibe Outfit",
    },
];

export default function ShopTheLook() {
    return (
        <section className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 md:text-3xl">
                    Shop the Look
                </h2>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:pb-0 scrollbar-hide">
                {looks.map((look) => (
                    <Link
                        key={look.id}
                        href={look.buttonLink}
                        className="group relative w-[85%] shrink-0 snap-center overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] md:w-auto"
                    >
                        {/* Image Container */}
                        <div className="relative h-[400px] w-full overflow-hidden">
                            <Image
                                src={look.image}
                                alt={look.imageAlt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="mb-2 text-2xl font-bold tracking-tight">
                                {look.title}
                            </h3>
                            <p className="mb-4 text-sm leading-relaxed text-white/90">
                                {look.description}
                            </p>
                            <button className="rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                                {look.buttonText}
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
