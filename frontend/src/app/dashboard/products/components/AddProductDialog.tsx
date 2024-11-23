/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus } from "lucide-react";
import productService from "@/services/productService";
import supplierService from "@/services/supplierService";

interface AddProductDialogProps {
    onAddProduct: () => void; // Atualizado para recarregar os produtos
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
    const [open, setOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores
    const [selectedSupplier, setSelectedSupplier] = useState<string | undefined>();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const supplierData = await supplierService.getSuppliers();
                setSuppliers(supplierData);
            } catch (error) {
                console.error("Erro ao buscar fornecedores:", error);
                alert("Erro ao carregar a lista de fornecedores.");
            }
        };

        fetchSuppliers();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const productData = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            price: parseFloat(formData.get("price") as string),
            supplierId: parseInt(selectedSupplier || "", 10),
            stock: parseInt(formData.get("stock") as string, 10),
            description: formData.get("description") as string,
        };

        try {
            await productService.createProduct(productData);
            onAddProduct();
            setOpen(false);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            alert("Erro ao criar produto.");
        }
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
                    <DialogTitle>Criar novo produto</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome do produto</Label>
                            <Input id="name" name="name" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoria</Label>
                            <Input id="category" name="category" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Preço</Label>
                            <Input id="price" name="price" type="number" step="0.01" required min="0" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="supplierId">Fornecedor</Label>
                            <Select
                                value={selectedSupplier}
                                onValueChange={setSelectedSupplier}
                            >
                                <SelectTrigger>
                                    {selectedSupplier
                                        ? suppliers.find((s) => s.id.toString() === selectedSupplier)?.name
                                        : "Selecione um fornecedor"}
                                </SelectTrigger>
                                <SelectContent>
                                    {suppliers.map((supplier: any) => (
                                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stock">Estoque</Label>
                            <Input id="stock" name="stock" type="number" required min="0" />
                        </div>

                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="description">Descrição do Produto</Label>
                            <Textarea id="description" name="description" rows={4} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Adicionar Produto</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
