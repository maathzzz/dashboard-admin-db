"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { ProductStatus } from "../components/ProductStatus";
import { initialProducts } from "../data/products";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductDetails({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState(initialProducts.find(p => p.id === params.id));

    useEffect(() => {
        if (!product) {
            router.push("/dashboard/products");
        }
    }, [product, router]);

    if (!product) return null;

    const handleSave = () => {
        // Implement save logic here
        router.push("/dashboard/products");
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/dashboard/products")}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="sku">SKU</Label>
                                <Input
                                    id="sku"
                                    value={product.sku}
                                    onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={product.category}
                                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={product.stock}
                                    onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={product.status}
                                    onValueChange={(value: "In Stock" | "Low Stock" | "Out of Stock") =>
                                        setProduct({ ...product, status: value })
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
                                    <ProductStatus status={product.status} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}