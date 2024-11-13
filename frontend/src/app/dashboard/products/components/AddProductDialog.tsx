"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ProductStatus } from "./ProductStatus";
import type { Product } from "../data/products";

interface AddProductDialogProps {
    onAddProduct: (product: Omit<Product, "id">) => void;
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: "In Stock",
        description: "",
        sku: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProduct(newProduct);
        setOpen(false);
        setNewProduct({
            name: "",
            category: "",
            price: 0,
            stock: 0,
            status: "In Stock",
            description: "",
            sku: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                required
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="sku">SKU</Label>
                            <Input
                                id="sku"
                                required
                                value={newProduct.sku}
                                onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                required
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                required
                                min="0"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                required
                                min="0"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={newProduct.status}
                                onValueChange={(value: "In Stock" | "Low Stock" | "Out of Stock") =>
                                    setNewProduct({ ...newProduct, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="In Stock">In Stock</SelectItem>
                                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="mt-2">
                                <ProductStatus status={newProduct.status} />
                            </div>
                        </div>

                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Product</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}