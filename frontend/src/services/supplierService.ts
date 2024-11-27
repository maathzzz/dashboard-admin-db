/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getToken } from "./authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const supplierService = {
  /**
   * Busca todos os fornecedores.
   */
  async getSuppliers() {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.get(`${API_BASE_URL}/supplier`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error);
      throw new Error("Erro ao listar fornecedores.");
    }
  },

  /**
  * Busca um fornecedor pelo ID.
  * @param {number | string} id - ID do fornecedor.
  */
  async getSupplierById(id: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.get(`${API_BASE_URL}/supplier/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error);
      throw new Error("Erro ao buscar fornecedor.");
    }
  },

  /**
   * Cria um novo fornecedor.
   * @param {Object} supplierData - Dados do fornecedor.
   */
  async createSupplier(supplierData: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.post(`${API_BASE_URL}/supplier`, supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar fornecedor:", error);
      throw new Error("Erro ao registrar fornecedor.");
    }
  },

  /**
   * Deleta um fornecedor pelo ID.
   * @param {number} id - ID do fornecedor a ser deletado.
   */
  async deleteSupplier(id: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.delete(`${API_BASE_URL}/supplier/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      throw new Error("Erro ao deletar fornecedor.");
    }
  },

  /**
   * Atualiza os dados de um fornecedor pelo ID.
   * @param {number} id - ID do fornecedor a ser atualizado.
   * @param {Object} supplierData - Dados atualizados do fornecedor.
   */
  async updateSupplier(id: any, supplierData: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Usuário não autenticado. Token não encontrado.");
      }
      const response = await axios.put(`${API_BASE_URL}/supplier/${id}`, supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      throw new Error("Erro ao atualizar fornecedor.");
    }
  },
};

export default supplierService;
