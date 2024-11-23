/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getToken } from "./authService"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const orderService = {
  createOrder: async (orderData: any) => {
    try {
      const token = getToken(); 
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.post(`${API_URL}/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "Erro ao criar pedido");
    }
  },

  getOrderById: async (orderId: number) => {
    try {
      const token = getToken(); 
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.get(`${API_URL}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "Erro ao obter pedido");
    }
  },

  // Listar todos os pedidos
  listOrders: async () => {
    try {
      const token = getToken(); 
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.get(`${API_URL}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, "Erro ao listar pedidos");
      router.push("/");
    }
  },
};

// Função auxiliar para lidar com erros
function handleError(error: unknown, defaultMessage: string): never {
  if (axios.isAxiosError(error)) {
    console.error(`${defaultMessage}:`, error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error(`${defaultMessage}:`, error.message);
  } else {
    console.error(`${defaultMessage}:`, error);
  }
  throw error; 
}

export default orderService;
