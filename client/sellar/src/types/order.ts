export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  pincode: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  category: string;
  sellerId: string;
  imageUrl: string;
  price: number;
  quantity: number;
  discount: number;
  ratings: number[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  itemId: Item;
  quantity: number;
  _id: string;
}

export interface Order {
  _id: string;
  sellerId: string;
  userId: User;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
}
