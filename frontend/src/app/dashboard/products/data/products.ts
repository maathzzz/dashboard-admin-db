export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  description?: string;
  sku?: string;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone X",
    category: "Electronics",
    price: 999.99,
    stock: 45,
    status: "In Stock",
    description: "Latest model with advanced features",
    sku: "SMX-001"
  },
  {
    id: "2",
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    stock: 5,
    status: "Low Stock",
    description: "Professional grade laptop",
    sku: "LP-002"
  },
  {
    id: "3",
    name: "Wireless Headphones",
    category: "Accessories",
    price: 199.99,
    stock: 0,
    status: "Out of Stock",
    description: "Premium wireless headphones",
    sku: "WH-003"
  },
  {
    id: "4",
    name: "Smart Watch",
    category: "Wearables",
    price: 299.99,
    stock: 28,
    status: "In Stock",
    description: "Feature-rich smartwatch",
    sku: "SW-004"
  },
  {
    id: "5",
    name: "Tablet Air",
    category: "Electronics",
    price: 649.99,
    stock: 12,
    status: "In Stock",
    description: "Lightweight and powerful tablet",
    sku: "TA-005"
  }
];