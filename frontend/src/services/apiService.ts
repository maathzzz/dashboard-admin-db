export async function fetchSuppliers<T>(): Promise<T | null> {
    const endpoint = "http://localhost:3001/supplier/list";
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
