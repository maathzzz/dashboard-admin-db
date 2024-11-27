/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getToken } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const productService = {
  async getProducts() {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.get(`${API_BASE_URL}/product/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw new Error("Erro ao buscar produtos.");
    }
  },

  async getProductById(id: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.get(`${API_BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw new Error("Erro ao buscar produto.");
    }
  },

  async createProduct(productData: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.post(`${API_BASE_URL}/product`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Erro ao criar produto.");
    }
  },

  async updateProduct(id: any, productData: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.put(`${API_BASE_URL}/product/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw new Error("Erro ao atualizar produto.");
    }
  },

  async deleteProduct(id: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.delete(`${API_BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw new Error("Erro ao deletar produto.");
    }
  },
};

export default productService;
