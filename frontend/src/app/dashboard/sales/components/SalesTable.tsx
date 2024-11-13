"use client"
import React, { useEffect, useState } from 'react';
import { useTable, Column } from 'react-table';
import { fetchSalesData, SaleData } from '../../../../lib/fetchSalesData';

const SalesTable: React.FC = () => {
    const [data, setData] = useState<SaleData[]>([]);

    useEffect(() => {
        const loadSalesData = async () => {
            const sales = await fetchSalesData();
            setData(sales);
        };
        loadSalesData();
    }, []);

    const columns = React.useMemo<Column<SaleData>[]>(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Item', accessor: 'item' },
            { Header: 'Quantidade', accessor: 'quantity' },
            { Header: 'Preço Unitário', accessor: 'price' },
            { Header: 'Total', accessor: 'total' },
            { Header: 'Data', accessor: 'date' },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="overflow-auto">
            <table {...getTableProps()} className="min-w-full border-collapse border border-gray-200">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="p-3 border-b text-left">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="p-3 border-b text-left">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
