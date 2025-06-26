import { useState, useEffect } from 'react';
import FormularioTarefas from '../../components/formulario/formulariotarefas';
import ListaDeTarefas from '../tarefas/tarefas';
import exibirTarefas from '../../api/exibirTarefas.jsx';

function CriarTarefa() {
  const [tarefas, setTarefas] = useState([]);

  const fetchTarefas = async () => {
    const tarefasObtidas = await exibirTarefas();
    setTarefas(tarefasObtidas);
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
  };

  return (
    <div className="criar-tarefa" role="main" aria-labelledby="tituloCriarTarefa">
      <FormularioTarefas onNovaTarefa={adicionarTarefa} />
      <ListaDeTarefas tarefas={tarefas} setTarefas={setTarefas} showSearchBar={false} />
    </div>
  );
}

export default CriarTarefa;
