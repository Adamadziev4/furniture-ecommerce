export interface IStoreItem {
  _id: string;
  id: number;
  name: string;
  category: string;
  color: string[];
  price: number;
  imgUrl: string;
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  count: number;
}

export interface IOrderBlock {
  date: String;
  order: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  count: number;
}

export interface IPersonalData {
  name: String;
  phone: String;
  city: String;
  street: String;
  house: String;
  flat: String;
  comment: String;
  cashPay: Boolean;
  onlinePay: Boolean;
}

export interface IPersonalFormData
  extends Omit<IPersonalData, "cashPay" | "onlinePay"> {
  cashPay: boolean;
  onlinePay: boolean;
}

export type AuthResponse = {
  token: String;
  cartItems: ICartItem[];
  personalData: IPersonalData;
  orderList: IOrderBlock[];
};
