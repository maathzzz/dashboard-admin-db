"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
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
        supplier: "",
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
            supplier: "",
            description: "",
            sku: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] p-4">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            <Label htmlFor="supplier">Supplier</Label>
                            <Input
                                id="supplier"
                                required
                                value={newProduct.supplier}
                                onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                            />
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
