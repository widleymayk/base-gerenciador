import axios from 'axios';

const exibirTarefas = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tarefas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao exibir tarefas:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default exibirTarefas;
