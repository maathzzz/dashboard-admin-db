"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package2, Search, Pencil, Trash2 } from "lucide-react";
import supplierService from "@/services/supplierService";
import { Supplier } from "@/data/suppliers";
import { AddSupplierDialog } from "./components/AddSupplierDialog";

export default function SuppliersPage() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    // Fetch suppliers when the component mounts
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await supplierService.getSuppliers();

                // Filtra fornecedores válidos
                const validSuppliers = data.filter((supplier: Supplier) => supplier.name);
                setSuppliers(validSuppliers);
            } catch (error) {
                console.error("Erro ao buscar fornecedores:", error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleAddSupplier = async () => {
        try {
            const data = await supplierService.getSuppliers();
            setSuppliers(data.filter((supplier: Supplier) => supplier.name)); // Filtra dados válidos
        } catch (error) {
            console.error("Erro ao atualizar lista de fornecedores:", error);
        }
    };

    const handleDeleteSupplier = async () => {
        if (!selectedSupplier) return;
        try {
            await supplierService.deleteSupplier(selectedSupplier.id);
            setSuppliers(suppliers.filter((supplier) => supplier.id !== selectedSupplier.id));
            setSelectedSupplier(null);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Erro ao deletar fornecedor:", error);
        }
    };

    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    );

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
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Telefone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSuppliers.map((supplier) => (
                                    <TableRow key={supplier.id} className=":hover:bg-muted/50">
                                        <TableCell className="font-medium">{supplier.id}</TableCell>
                                        <TableCell className="font-medium">{supplier.name}</TableCell>
                                        <TableCell>{supplier.phone}</TableCell>
                                        <TableCell>{supplier.email}</TableCell>
                                        <TableCell className="text-right">
                                            <div
                                                className="flex justify-end gap-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/dashboard/suppliers/${supplier.id}`);
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
                                                        setSelectedSupplier(supplier);
                                                        setIsDialogOpen(true);
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

            {/* Dialog de Confirmação */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Você tem certeza que deseja excluir o fornecedor{" "}
                            <span className="font-bold">{selectedSupplier?.name}</span>?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteSupplier}>
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
