export async function fetchSuppliers<T>(endpoint: string): Promise<T | null> {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        return null;
    }
}
