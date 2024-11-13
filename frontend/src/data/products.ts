export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  supplier: string;
  description?: string;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone X",
    category: "Electronics",
    price: 999.99,
    supplier: "In Stock",
    description: "Latest model with advanced features",
  },
  {
    id: "2",
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    supplier: "Low Stock",
    description: "Professional grade laptop",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    category: "Accessories",
    price: 199.99,
    supplier: "Out of Stock",
    description: "Premium wireless headphones",
  },
  {
    id: "4",
    name: "Smart Watch",
    category: "Wearables",
    price: 299.99,
    supplier: "In Stock",
    description: "Feature-rich smartwatch",
  },
  {
    id: "5",
    name: "Tablet Air",
    category: "Electronics",
    price: 649.99,
    supplier: "In Stock",
    description: "Lightweight and powerful tablet",
  }
];