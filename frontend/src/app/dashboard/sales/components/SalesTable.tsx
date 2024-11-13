"use client"
// import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SalesTable() {
    // const [data, setData] = useState<SaleData[]>([]);

    // useEffect(() => {
    //     const loadSalesData = async () => {
    //         const sales = await fetchSalesData();
    //         setData(sales);
    //     };
    //     loadSalesData();
    // }, []);

    const filteredSuppliers = [
        {
            "name": "Cetro Máquinas",
            "category": "Eletrônico",
            "price": 100,
            "id": 10,
            "description": "asd",
            "supplier": "CETRO"

        }
    ]

    return (
        <div className="overflow-auto">
            <ScrollArea className="h-[calc(100vh-16rem)]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead className="hidden md:table-cell">Items</TableHead>
                            <TableHead>Preço Total</TableHead>
                            <TableHead className="hidden sm:table-cell">Endereço</TableHead>
                            <TableHead className="hidden lg:table-cell">Método de Pagamento</TableHead>
                            <TableHead className="hidden lg:table-cell">Usuário</TableHead>
                            <TableHead className="hidden lg:table-cell">Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSuppliers.map((supplier) => (
                            <TableRow
                                key={supplier.id}
                                className="cursor-pointer hover:bg-muted/50"
                            >
                                <TableCell className="font-medium">{supplier.id}</TableCell>
                                <TableCell className="hidden md:table-cell">{supplier.category}</TableCell>
                                <TableCell>${supplier.price.toFixed(2)}</TableCell>
                                <TableCell className="hidden sm:table-cell">{supplier.description}</TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    {supplier.supplier}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
};

export default SalesTable;
