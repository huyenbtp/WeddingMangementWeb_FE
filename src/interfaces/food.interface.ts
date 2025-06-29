export interface IFood {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
};

export interface IFoodBooking {
    foodId: string;
    name: string;
    price: number;
    category: string;
    note: string;
};