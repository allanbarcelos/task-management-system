import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // ajuste conforme seu backend

export const cancelTask = async (taskId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${taskId}/cancel`,
      {}, // corpo vazio
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro ao cancelar tarefa' };
  }
};
