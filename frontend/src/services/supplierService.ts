/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const supplierService = {
  /**
   * Busca todos os fornecedores.
   */
  async getSuppliers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/supplier/list`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error);
      throw new Error("Erro ao listar fornecedores.");
    }
  },

  /**
   * Cria um novo fornecedor.
   * @param {Object} supplierData - Dados do fornecedor.
   * @param {string} supplierData.name - Nome do fornecedor.
   * @param {string} supplierData.phone - Telefone do fornecedor.
   * @param {string} supplierData.cnpj - CNPJ do fornecedor.
   * @param {string} supplierData.email - Email do fornecedor.
   */
  async createSupplier(supplierData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData);
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
      const response = await axios.delete(`${API_BASE_URL}/suppliers/${id}`);
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
   * @param {string} supplierData.name - Nome do fornecedor.
   * @param {string} supplierData.phone - Telefone do fornecedor.
   * @param {string} supplierData.cnpj - CNPJ do fornecedor.
   * @param {string} supplierData.email - Email do fornecedor.
   */
  async updateSupplier(id: any, supplierData: any) {
    try {
      const response = await axios.put(`${API_BASE_URL}/suppliers/${id}`, supplierData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      throw new Error("Erro ao atualizar fornecedor.");
    }
  },
};

export default supplierService;
