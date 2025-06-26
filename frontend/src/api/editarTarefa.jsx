
import axios from 'axios';

const editarTarefa = async (id, tarefa) => {
  try {
    // eslint-disable-next-line no-undef
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tarefas/${id}`, tarefa, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
    throw error; 
  }
};

export default editarTarefa;
