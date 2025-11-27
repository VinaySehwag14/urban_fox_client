// Order types and interfaces
export type OrderStatus = "delivered" | "processing" | "shipped" | "cancelled";

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
}

export interface OrderItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

export const ORDER_STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; color: string; bgColor: string }
> = {
    delivered: {
        label: "Delivered",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-950/20",
    },
    processing: {
        label: "Processing",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-950/20",
    },
    shipped: {
        label: "Shipped",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-950/20",
    },
    cancelled: {
        label: "Cancelled",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-950/20",
    },
};
