"use client";

import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/order";

interface OrderStatusFilterProps {
    activeStatus: OrderStatus | "all";
    onStatusChange: (status: OrderStatus | "all") => void;
}

const statusOptions: Array<{ value: OrderStatus | "all"; label: string }> = [
    { value: "all", label: "All Orders" },
    { value: "shipped", label: "Shipped" },
    { value: "processing", label: "Processing" },
    { value: "delivered", label: "Delivered" },
];

export default function OrderStatusFilter({
    activeStatus,
    onStatusChange,
}: OrderStatusFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onStatusChange(option.value)}
                    className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        activeStatus === option.value
                            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                            : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
