import SalesTable from './components/SalesTable';

const SalesPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-6 overflow-y">
            <h1 className="text-2xl font-bold mb-4">Relatório de Vendas</h1>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Resumo de Vendas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Total de Vendas</p>
                        <p className="text-xl font-bold">R$1050</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Total de Itens Vendidos</p>
                        <p className="text-xl font-bold">8</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Pedidos</p>
                        <p className="text-xl font-bold">3</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-sm text-gray-600">Média por Pedido</p>
                        <p className="text-xl font-bold">R$350</p>
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
