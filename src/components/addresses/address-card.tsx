"use client";

import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Address } from "@/types/address";
import { cn } from "@/lib/utils";

interface AddressCardProps {
    address: Address;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const ADDRESS_TYPE_CONFIG = {
    home: {
        icon: MapPin,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    work: {
        icon: MapPin,
        color: "text-zinc-600 dark:text-zinc-400",
        bgColor: "bg-zinc-50 dark:bg-zinc-800",
    },
    other: {
        icon: MapPin,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
};

export default function AddressCard({
    address,
    onEdit,
    onDelete,
}: AddressCardProps) {
    const config = ADDRESS_TYPE_CONFIG[address.type];
    const Icon = config.icon;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            config.bgColor
                        )}
                    >
                        <Icon className={cn("h-5 w-5", config.color)} />
                    </div>
                    <div>
                        <h3 className="font-bold capitalize text-zinc-900 dark:text-zinc-50">
                            {address.type}
                        </h3>
                        {address.isDefault && (
                            <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                                Default
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Address Details */}
            <div className="mb-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {address.name}
                </p>
                <p>{address.street}</p>
                <p>
                    {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
                <p className="pt-1">{address.phone}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(address.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(address.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </button>
            </div>
        </div>
    );
}
