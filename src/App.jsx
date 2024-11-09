
import React, { useState, useEffect } from 'react';
import TaskForm from './components/FormTarefas/FormTarefas';
import TaskList from './components/TaskList/TaskList';
import ItemDeTarefa from './components/ItemDeTarefa/ItemDeTarefa';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [equipas, setEquipas] = useState([]);

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));
    const equipasArmazenadas = JSON.parse(localStorage.getItem('equipas'));
    if (tarefasArmazenadas) setTarefas(tarefasArmazenadas);
    if (equipasArmazenadas) setEquipas(equipasArmazenadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('equipas', JSON.stringify(equipas));
  }, [tarefas, equipas]);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, novaTarefa]);
  };

  const atualizarTarefa = (tarefaAtualizada) => {
    setTarefas(tarefas.map((tarefa) => (tarefa.tarefa === tarefaAtualizada.tarefa ? tarefaAtualizada : tarefa)));
  };

  const excluirTarefa = (tarefaParaExcluir) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.tarefa !== tarefaParaExcluir.tarefa));
  };

  const adicionarEquipa = (novaEquipa) => {
    setEquipas([...equipas, novaEquipa]);
  };

  return (
    <div>
      <TaskForm adicionarTarefa={adicionarTarefa} equipas={equipas} />
      <TaskList tarefas={tarefas} atualizarTarefa={atualizarTarefa} excluirTarefa={excluirTarefa} />
      <ItemDeTarefa atualizarTarefa={atualizarTarefa} tarefa={tarefas} excluirTarefa={excluirTarefa}/>
      
      
    </div>
  );
};

export default App;
