/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ProductForm, ProductFormValues } from "../components/ProductForm";
import { Product } from "@/types/products";
import productService from "@/services/productService";
import { getToken } from "@/services/authService";

export default function ProductEdit() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    const token = getToken();

    const fetchProduct = async (id: any) => {
        try {
            const productData = await productService.getProductById(id); // Usando o serviço
            setProduct(productData);
        } catch (error) {
            console.error("Erro ao carregar dados do produto:", error);
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao carregar dados do produto",
            });
        } finally {
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(params.id); // Chamada ao método usando o ID dos parâmetros
    }, [params.id, toast]);

    async function onSubmit(data: ProductFormValues) {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/product/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...data,
                    price: Number(data.price),
                    supplierId: Number(data.supplierId),
                    stock: Number(data.stock)
                }),
            });

            if (!response.ok) throw new Error("Erro ao atualizar produto");

            toast({
                title: "Sucesso",
                description: "Produto atualizado com sucesso",
            });

            router.push("/dashboard/products");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao atualizar produto",
            });
        } finally {
            setLoading(false);
        }
    }

    if (initialLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!product) {
        return null;
    }

    const initialData: ProductFormValues = {
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        supplierId: product.supplierId.toString(),
        stock: product.stock.toString()
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Editar Produto</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductForm
                        initialData={initialData}
                        supplier={product.supplier}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                </CardContent>
            </Card>
        </div>
    );
}