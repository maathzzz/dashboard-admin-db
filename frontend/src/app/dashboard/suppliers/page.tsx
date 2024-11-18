"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Search, Pencil, Trash2 } from "lucide-react";
import { AddSupplierDialog } from "./components/AddSupplierDialog";
import { fetchSuppliers } from "@/services/apiService";
import type { Supplier } from "../../../data/suppliers";

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadSuppliers = async () => {
            setLoading(true);
            const data = await fetchSuppliers<Supplier[]>();
            if (data) {
                setSuppliers(data);
            }
            setLoading(false);
        };

        loadSuppliers();
    }, []);

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddSupplier = (newSupplier: Omit<Supplier, "id">) => {
        setSuppliers([...suppliers, { ...newSupplier, id: Date.now() }]);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                        <Package2 className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Fornecedores</h1>
                    </div>
                    <AddSupplierDialog onAddSupplier={handleAddSupplier} />
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Procurar fornecedor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:max-w-sm"
                    />
                </div>

                <div className="rounded-lg border bg-card">
                    {loading ? (
                        <p className="text-center py-4">Carregando fornecedores...</p>
                    ) : (
                        <ScrollArea className="h-[calc(100vh-16rem)]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fornecedor</TableHead>
                                        <TableHead className="hidden md:table-cell">Telefone</TableHead>
                                        <TableHead>CNPJ</TableHead>
                                        <TableHead className="hidden sm:table-cell">E-mail</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSuppliers.length > 0 ? (
                                        filteredSuppliers.map((supplier) => (
                                            <TableRow
                                                key={supplier.id}
                                                className="cursor-pointer hover:bg-muted/50"
                                            >
                                                <TableCell className="font-medium">{supplier.name}</TableCell>
                                                <TableCell className="hidden md:table-cell">{supplier.phone}</TableCell>
                                                <TableCell>{supplier.cnpj}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{supplier.email}</TableCell>
                                                <TableCell className="text-right">
                                                    <div
                                                        className="flex justify-end gap-2"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSuppliers(
                                                                    suppliers.filter((s) => s.id !== supplier.id)
                                                                );
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                Nenhum fornecedor encontrado.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    )}
                </div>
            </div>
        </div>
    );
}
