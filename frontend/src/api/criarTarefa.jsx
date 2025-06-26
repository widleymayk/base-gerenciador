import axios from 'axios';

const criarTarefa = async (formData) => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tarefas`, formData);
    return response.data;

  } catch (error) {
    console.error('Erro ao criar tarefa:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default criarTarefa;
