import React, { useState, useEffect } from 'react';
import './FormTarefas.css'; 

const membros = ['Eder', 'Stivan', 'Kevin'];

function FormTarefas() {
  const [texto, setTexto] = useState('');
  const [status, setStatus] = useState('pendente');
  const [membro, setMembro] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [tarefas, setTarefas] = useState([]); // Estado para armazenar a lista de tarefas
  const [editandoTarefa, setEditandoTarefa] = useState(null);

  useEffect(() => {
    if (editandoTarefa) {
      setTexto(editandoTarefa.texto);
      setStatus(editandoTarefa.status);
      setMembro(editandoTarefa.membro);
      setDataEntrega(editandoTarefa.dataEntrega);
    } else {
      setTexto('');
      setStatus('pendente');
      setMembro('');
      setDataEntrega('');
    }
  }, [editandoTarefa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tarefa = { 
      id: editandoTarefa ? editandoTarefa.id : Date.now(), 
      texto, 
      status, 
      membro, 
      dataEntrega 
    };

    if (editandoTarefa) {
      setTarefas(tarefas.map(t => t.id === editandoTarefa.id ? tarefa : t)); // Editar tarefa
    } else {
      setTarefas([...tarefas, tarefa]); // Adicionar nova tarefa
    }

    // Resetar campos do formulário após submit
    setTexto('');
    setStatus('pendente');
    setMembro('');
    setDataEntrega('');
    setEditandoTarefa(null);
  };

  const excluirTarefa = (tarefaParaExcluir) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== tarefaParaExcluir.id)); // Excluir tarefa
  };

  const atualizarTarefa = (tarefaAtualizada) => {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
    ));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{editandoTarefa ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="task-title">Título da Tarefa</label>
          <input
            type="text"
            id="task-title"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="form-input"
            placeholder="Digite o título da tarefa"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="team-member">Membro da Equipe:</label>
          <select
            id="team-member"
            value={membro}
            onChange={(e) => setMembro(e.target.value)}
            className="form-input"
          >
            <option value="">Selecione um membro</option>
            {membros.map((membro) => (
              <option key={membro} value={membro}>{membro}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="due-date">Data de Entrega:</label>
          <input
            type="date"
            id="due-date"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status:</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-input"
          >
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluído">Concluído</option>
          </select>
        </div>
        <button type="submit" className="form-button">
          {editandoTarefa ? 'Salvar Tarefa' : 'Adicionar Tarefa'}
        </button>
      </form>

      <div className="lista-de-tarefas">
        {tarefas.map((tarefa) => (
          <ItemDeTarefa 
            key={tarefa.id} 
            tarefa={tarefa} 
            atualizarTarefa={atualizarTarefa} 
            excluirTarefa={excluirTarefa} 
          />
        ))}
      </div>
    </div>
  );
}

export default FormTarefas;
