import { Supplier } from "./suppliers";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stock: number;
  supplier: Supplier;
  supplierId: number;
  description: string;
}
