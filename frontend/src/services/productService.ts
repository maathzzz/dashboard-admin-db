/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const productService = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw new Error("Erro ao buscar produtos.");
    }
  },

  async getProductById(id: any) {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw new Error("Erro ao buscar produto.");
    }
  },

  async createProduct(productData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/product`, productData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Erro ao criar produto.");
    }
  },

  async updateProduct(id: any, productData: any) {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw new Error("Erro ao atualizar produto.");
    }
  },

  async deleteProduct(id: any) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw new Error("Erro ao deletar produto.");
    }
  },
};

export default productService;
