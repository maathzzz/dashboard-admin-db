"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddSupplierDialog } from "./components/AddSupplierDialog";
import type { Supplier } from "../../../data/suppliers";

const initialSuppliers: Supplier[] = [
    {
        id: 1,
        name: "Fornecedor A",
        phone: "123-456-7890",
        cnpj: "12.345.678/0001-99",
        email: "fornecedorA@example.com",
    },
    {
        id: 2,
        name: "Fornecedor B",
        phone: "987-654-3210",
        cnpj: "98.765.432/0001-10",
        email: "fornecedorB@example.com",
    },
    {
        id: 3,
        name: "Fornecedor C",
        phone: "555-555-5555",
        cnpj: "55.555.555/0001-55",
        email: "fornecedorC@example.com",
    },
];
export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddSupplier = (newSupplier: Omit<Supplier, "id">) => {
        setSuppliers([...suppliers, { ...newSupplier, id: 1 }]);
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
                                {filteredSuppliers.map((supplier) => (
                                    <TableRow
                                        key={supplier.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">{supplier.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{supplier.phone}</TableCell>
                                        <TableCell>{supplier.cnpj}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{supplier.email}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSuppliers(suppliers.filter(s => s.id !== supplier.id));
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
