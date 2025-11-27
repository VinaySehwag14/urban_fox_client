"use client";

import { useState, useMemo } from "react";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import OrderSearchBar from "@/components/orders/order-search-bar";
import OrderStatusFilter from "@/components/orders/order-status-filter";
import OrderCard from "@/components/orders/order-card";
import Pagination from "@/components/orders/pagination";
import { Order, OrderStatus } from "@/types/order";

// Mock data
const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "WW-123456",
        date: "July 26, 2024",
        status: "delivered",
        total: 125.50,
        items: [],
    },
    {
        id: "2",
        orderNumber: "WW-123412",
        date: "July 15, 2024",
        status: "processing",
        total: 68.00,
        items: [],
    },
    {
        id: "3",
        orderNumber: "WW-123398",
        date: "July 10, 2024",
        status: "shipped",
        total: 99.00,
        items: [],
    },
    {
        id: "4",
        orderNumber: "WW-123345",
        date: "June 28, 2024",
        status: "delivered",
        total: 156.00,
        items: [],
    },
    {
        id: "5",
        orderNumber: "WW-123289",
        date: "June 15, 2024",
        status: "delivered",
        total: 89.99,
        items: [],
    },
];

const ORDERS_PER_PAGE = 3;

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeStatus, setActiveStatus] = useState<OrderStatus | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter orders based on search and status
    const filteredOrders = useMemo(() => {
        return mockOrders.filter((order) => {
            const matchesSearch =
                searchQuery === "" ||
                order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                activeStatus === "all" || order.status === activeStatus;

            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, activeStatus]);

    // Paginate orders
    const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
        return filteredOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    // Reset to page 1 when filters change
    const handleStatusChange = (status: OrderStatus | "all") => {
        setActiveStatus(status);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar */}
                    <ProfileSidebar />

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                                Order History
                            </h1>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Review your past purchases and track your shipments.
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="w-full sm:w-96">
                                <OrderSearchBar
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <OrderStatusFilter
                                activeStatus={activeStatus}
                                onStatusChange={handleStatusChange}
                            />
                        </div>

                        {/* Orders List */}
                        <div className="space-y-4">
                            {paginatedOrders.length > 0 ? (
                                paginatedOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))
                            ) : (
                                <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                                    <p className="text-zinc-500 dark:text-zinc-400">
                                        No orders found matching your criteria.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
