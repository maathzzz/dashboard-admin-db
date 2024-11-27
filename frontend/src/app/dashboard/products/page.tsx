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
import { AddProductDialog } from "./components/AddProductDialog";
import productService from "@/services/productService";
import { Product } from "@/types/products";

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Erro ao atualizar lista de produtos:", error);
        }
    };

    const handleDeleteProduct = async () => {
        if (!selectedProduct) return;
        try {
            await productService.deleteProduct(selectedProduct.id);
            setProducts(products.filter((product) => product.id !== selectedProduct.id));
            setSelectedProduct(null);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                        <Package2 className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Produtos</h1>
                    </div>
                    <AddProductDialog onAddProduct={handleAddProduct} />
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Procurar produto..."
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
                                    <TableHead>Produto</TableHead>
                                    <TableHead className="hidden md:table-cell">Categoria</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead>Estoque</TableHead>
                                    <TableHead className="hidden sm:table-cell">Descrição</TableHead>
                                    <TableHead className="hidden lg:table-cell">Fornecedor</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        className=":hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {product.category}
                                        </TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.description || "N/A"}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {product.supplier?.name || "N/A"}
                                        </TableCell>
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
                                                        router.push(`/dashboard/products/${product.id}`);
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
                                                        setSelectedProduct(product);
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
                            Você tem certeza que deseja excluir o produto{" "}
                            <span className="font-bold">{selectedProduct?.name}</span>?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteProduct}>
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
