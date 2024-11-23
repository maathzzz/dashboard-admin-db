import { Supplier } from "./suppliers";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: Supplier;
  supplierId: number;
  description: string;
}
