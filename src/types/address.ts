// Address types
export type AddressType = "home" | "work" | "other";

export interface Address {
    id: string;
    type: AddressType;
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
}
