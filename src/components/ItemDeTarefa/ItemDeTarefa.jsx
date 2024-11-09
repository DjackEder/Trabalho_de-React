import React from 'react';
import './ItemDeTarefa.css'; 

const ItemDeTarefa = ({ tarefa, atualizarTarefa, excluirTarefa }) => {
  const handleStatusChange = (e) => {
    atualizarTarefa({ ...tarefa, status: e.target.value });
  };

  return (
    <div className="item-de-tarefa">
      <h3>{tarefa.texto}</h3>
      <h4>Responsável: {tarefa.membro}</h4>
      <h4>Data de Entrega: {tarefa.dataEntrega}</h4>
      <div className="status-container">
        <label>Status: </label>
        <select value={tarefa.status} onChange={handleStatusChange}>
          <option value="pendente">Pendente</option>
          <option value="em progresso">Em Progresso</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>
      <button onClick={() => excluirTarefa(tarefa)} className="delete-button">
        Excluir
      </button>
    </div>
  );
};

export default ItemDeTarefa;
