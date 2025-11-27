"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import AddressCard from "@/components/addresses/address-card";
import { Address } from "@/types/address";
import { Button } from "@/components/ui/button";

// Mock data
const initialAddresses: Address[] = [
    {
        id: "1",
        type: "home",
        name: "Alex Doe",
        street: "123 Neon Ave, Electro City",
        city: "Electro City",
        state: "CA",
        zipCode: "90210",
        country: "United States",
        phone: "(555) 123-4567",
        isDefault: true,
    },
    {
        id: "2",
        type: "work",
        name: "Alex Doe",
        street: "456 Circuit Board Rd, Tech Park",
        city: "Tech Park",
        state: "CA",
        zipCode: "90211",
        country: "United States",
        phone: "(555) 987-6543",
        isDefault: false,
    },
];

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

    const handleEditAddress = (id: string) => {
        // In a real app, this would open an edit modal/form
        console.log("Editing address:", id);
    };

    const handleDeleteAddress = (id: string) => {
        // In a real app, this would show a confirmation dialog
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    };

    const handleAddNewAddress = () => {
        // In a real app, this would open an add address modal/form
        console.log("Adding new address");
    };

    return (
        <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar */}
                    <ProfileSidebar />

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Breadcrumbs */}
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            <span>My Profile</span>
                            <span className="mx-2">/</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                Address Book
                            </span>
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                                Address Book
                            </h1>
                            <Button
                                onClick={handleAddNewAddress}
                                className="rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Add New Address
                            </Button>
                        </div>

                        {/* Addresses Grid */}
                        {addresses.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {addresses.map((address) => (
                                    <AddressCard
                                        key={address.id}
                                        address={address}
                                        onEdit={handleEditAddress}
                                        onDelete={handleDeleteAddress}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                                    No addresses saved yet
                                </p>
                                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                    Add your first address to get started.
                                </p>
                                <Button
                                    onClick={handleAddNewAddress}
                                    className="mt-4 rounded-full"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add Address
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
