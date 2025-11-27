"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OrderSearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function OrderSearchBar({ value, onChange }: OrderSearchBarProps) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <Input
                type="text"
                placeholder="Search by order # or product"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 bg-white dark:bg-zinc-900"
            />
        </div>
    );
}
