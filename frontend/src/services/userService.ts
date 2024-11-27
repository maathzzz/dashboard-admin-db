/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getToken } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const userService = {
  async getUsers() {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Usuário não autenticado. Token não encontrado.');
      }
      const response = await axios.get(`${API_BASE_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários.');
    }
  },

  async getUserById(id: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Usuário não autenticado. Token não encontrado.');
      }
      const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro ao buscar usuário.');
    }
  },

  async updateUser(id: any, userData: any) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Usuário não autenticado. Token não encontrado.');
      }
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário.');
    }
  },
};

export default userService;
