import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import orderService from "@/services/orderService";
import { formatDateFromISO } from "@/helpers/dateHelper"; // Importa o helper atualizado

interface Item {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
    };
}

interface SaleData {
    id: number;
    items: Item[];
    total_price: number;
    address: string;
    payment_method: string;
    user_id: number;
    createdAt: string;
}

export function SalesTable() {
    const [data, setData] = useState<SaleData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSalesData = async () => {
            try {
                const response = await orderService.listOrders(); // Chama o serviço
                setData(response.data); // Popula o estado com os dados reais
            } catch (error) {
                console.error("Erro ao buscar dados de vendas:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSalesData();
    }, []);

    if (loading) {
        return <div>Carregando vendas...</div>;
    }

    return (
        <div className="overflow-auto">
            <ScrollArea className="h-[calc(100vh-16rem)]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead className="hidden md:table-cell">Itens</TableHead>
                            <TableHead>Preço Total</TableHead>
                            <TableHead className="hidden sm:table-cell">Endereço</TableHead>
                            <TableHead className="hidden lg:table-cell">Método de Pagamento</TableHead>
                            <TableHead className="hidden lg:table-cell">Usuário</TableHead>
                            <TableHead className="hidden lg:table-cell">Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((sale) => (
                            <TableRow key={sale.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{sale.id}</TableCell>
                                {/* Renderiza os itens formatados */}
                                <TableCell className="hidden md:table-cell">
                                    {sale.items.map((item) => (
                                        <div key={item.id}>
                                            {item.product.name} (x{item.quantity})
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>R${sale.total_price.toFixed(2)}</TableCell>
                                <TableCell className="hidden sm:table-cell">{sale.address}</TableCell>
                                <TableCell className="hidden lg:table-cell">{sale.payment_method}</TableCell>
                                <TableCell className="hidden lg:table-cell">{sale.user_id}</TableCell>
                                <TableCell className="hidden lg:table-cell">{formatDateFromISO(sale.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}

export default SalesTable;
