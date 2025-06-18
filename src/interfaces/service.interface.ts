export interface IService {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};

export interface IServiceBooking {
    serviceId: string;
    name: string;
    price: number;
    quantity: number;
    note: string;
}