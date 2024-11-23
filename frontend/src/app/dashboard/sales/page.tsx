"use client"
import React, { useEffect, useState } from "react";
import SalesTable from "./components/SalesTable";
import orderService from "@/services/orderService";
import { useRouter } from 'next/navigation';

interface SalesSummary {
    totalSales: number;
    totalItemsSold: number;
    orderCount: number;
    averageTicket: number;
}

const SalesPage: React.FC = () => {
    const [summary, setSummary] = useState<SalesSummary | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSalesSummary = async () => {
            try {
                const data = await orderService.listOrders(); 
                setSummary({
                    totalSales: data.totalSales,
                    totalItemsSold: data.totalItemsSold,
                    orderCount: data.orderCount,
                    averageTicket: data.averageTicket,
                });
            } catch (error) {
                console.error("Erro ao buscar resumo de vendas:", error);
                router.push('/')
            }
        };

        fetchSalesSummary();
    }, []);

    if (!summary) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6 overflow-y">
            <h1 className="text-2xl font-bold mb-4">Relatório de Vendas</h1>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Resumo de Vendas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Total de Vendas</p>
                        <p className="text-xl font-bold">R${summary.totalSales.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Total de Itens Vendidos</p>
                        <p className="text-xl font-bold">{summary.totalItemsSold}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Pedidos</p>
                        <p className="text-xl font-bold">{summary.orderCount}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Média por Pedido</p>
                        <p className="text-xl font-bold">R${summary.averageTicket.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Detalhes das Vendas</h2>
                <SalesTable />
            </div>
        </div>
    );
};

export default SalesPage;
