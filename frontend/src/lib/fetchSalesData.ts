export type SaleData = {
  id: number;
  item: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
};

export const fetchSalesData = async (): Promise<SaleData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, item: 'Produto A', quantity: 5, price: 100, total: 500, date: '2024-11-01' },
        { id: 2, item: 'Produto B', quantity: 2, price: 150, total: 300, date: '2024-11-02' },
        { id: 3, item: 'Produto C', quantity: 1, price: 250, total: 250, date: '2024-11-03' },
      ]);
    }, 500);
  });
};
