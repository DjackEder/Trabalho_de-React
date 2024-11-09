// src/components/ListaDeTarefas.jsx
import React from 'react';
import ItemDeTarefa from '../ItemDeTarefa/ItemDeTarefa';

const TaskList = ({ tarefas, atualizarTarefa, excluirTarefa }) => {
  return (
    <div>
      {tarefas.map((tarefa, index) => (
        <ItemDeTarefa 
          key={index} 
          tarefa={tarefa} 
          atualizarTarefa={atualizarTarefa} 
          excluirTarefa={excluirTarefa} 
        />
      ))}
    </div>
  );
};

export default TaskList;
