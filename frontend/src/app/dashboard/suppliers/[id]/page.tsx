"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SupplierForm, SupplierFormValues } from "../components/SupplierForm";
import supplierService from "@/services/supplierService";
import { Supplier } from "@/data/suppliers";

export default function SupplierEdit() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [supplier, setSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await supplierService.getSuppliers(params.id);

                setSupplier(response);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Erro ao carregar dados do fornecedor",
                });
            } finally {
                setInitialLoading(false);
            }
        };

        fetchSupplier();
    }, [params.id, toast]);

    async function onSubmit(data: SupplierFormValues) {
        setLoading(true);
        try {
            await supplierService.updateSupplier(params.id, {
                ...data,
            });

            toast({
                title: "Sucesso",
                description: "Fornecedor atualizado com sucesso",
            });

            router.push("/dashboard/supplier");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao atualizar fornecedor",
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

    if (!supplier) {
        return null;
    }

    const initialData: SupplierFormValues = {
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
        cnpj: supplier.cnpj,
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Editar Fornecedor</CardTitle>
                </CardHeader>
                <CardContent>
                    <SupplierForm
                        initialData={initialData}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
