export class Item {
    id: string;
    name: string;
    img: string;
    desc: string;
    phone: string;
    address: string;
    offers: MenuItem[];
    likes: number;
}

export class MenuItem {
    id: string;
    name: string;
    price: string;
    quantity = 0;
}

export class MenuItemCart {
    id: string;
    name: string;
    price: string;
    quantity: number;
}
