import axios from 'axios';

const excluirTarefa = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/tarefas/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw error; 
  }
};

export default excluirTarefa;
