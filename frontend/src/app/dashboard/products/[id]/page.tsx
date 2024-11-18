/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ProductForm, ProductFormValues } from "../components/ProductForm";
import { Product } from "../../../../data/products";
import { Supplier } from "../../../../data/suppliers";

export default function ProductEdit() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, suppliersRes] = await Promise.all([
                    fetch(`/api/products/${params.id}`),
                    fetch('/api/suppliers')
                ]);

                const [productData, suppliersData] = await Promise.all([
                    productRes.json(),
                    suppliersRes.json()
                ]);

                setProduct(productData);
                setSuppliers(suppliersData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Erro ao carregar dados do produto",
                });
            } finally {
                setInitialLoading(false);
            }
        };

        fetchData();
    }, [params.id, toast]);

    async function onSubmit(data: ProductFormValues) {
        setLoading(true);
        try {
            const response = await fetch(`/api/products/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    price: Number(data.price),
                    supplierId: Number(data.supplierId),
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

    const initialData = product ? {
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        supplierId: product.supplierId.toString(),
    } : undefined;

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Editar Produto</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductForm
                        initialData={initialData}
                        suppliers={suppliers}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                </CardContent>
            </Card>
        </div>
    );
}