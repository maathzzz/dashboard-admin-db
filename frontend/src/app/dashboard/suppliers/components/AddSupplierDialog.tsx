"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import type { Supplier } from "../../../../data/suppliers";

interface AddSuppliertDialogProps {
    onAddSupplier: (supplier: Omit<Supplier, "id">) => void;
}

export function AddSupplierDialog({ onAddSupplier }: AddSuppliertDialogProps) {
    const [open, setOpen] = useState(false);
    const [newSupplier, setNewSupplier] = useState<Omit<Supplier, "id">>({
        name: "",
        phone: "",
        cnpj: "",
        email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddSupplier(newSupplier);
        setOpen(false);
        setNewSupplier({
            name: "",
            phone: "",
            cnpj: "",
            email: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Fornecedor
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] p-4">
                <DialogHeader>
                    <DialogTitle>Novo Fornecedor</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Fornecedor</Label>
                            <Input
                                id="name"
                                required
                                value={newSupplier.name}
                                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Telefone</Label>
                            <Input
                                id="category"
                                required
                                value={newSupplier.phone}
                                onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">CNPJ</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                required
                                min="0"
                                value={newSupplier.cnpj}
                                onChange={(e) => setNewSupplier({ ...newSupplier, cnpj: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="supplier">E-mail</Label>
                            <Input
                                id="supplier"
                                required
                                value={newSupplier.email}
                                onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Criar</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}