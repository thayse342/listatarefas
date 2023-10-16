import React, { useEffect, useState } from "react";
import "./style.scss";
import { TarefasService } from "../../api/TarefasService";

export default function Tarefas({ id_tarefa, descricao, concluido }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(descricao);
  const [concluir, setConcluir] = useState(concluido);

  const apagarTarefa = async () => {
    const { status } = await TarefasService.apagarTarefa(id_tarefa);
    if (status === 200) {
      // Atualize o estado local ou a lógica apropriada aqui em vez de recarregar a página
      // setIsDeleted(true);
    } else {
      alert("Erro");
    }
  };

  const editarTarefa = () => {
    setIsEditing(true);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const body = {
        descricao: event.target.value,
      };
      const { status } = await TarefasService.atualizarTarefa(id_tarefa, body);
      if (status === 200) {
        setIsEditing(false);
      } else {
        alert("Erro ao atualizar a tarefa");
      }
    }
  };

  const setConcluido = async () => {
    const novoConcluir = concluir === 1 ? 0 : 1;

    setConcluir(novoConcluir);

    const body = {
      concluido: novoConcluir,
    };

    const { status } = await TarefasService.atualizarTarefa(id_tarefa, body);

    if (status !== 200) {
      alert("Erro ao atualizar a tarefa");
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.getElementById(id_tarefa).focus();
    }
  }, [isEditing]);

  return (
    <div className="Tarefas">
      <li className="Tarefas__li">
        <input
          type="checkbox"
          className="Tarefas__checkbox"
          checked={concluir === 1}
          onChange={setConcluido}
        />
        <input
          id={id_tarefa}
          type="text"
          className="Tarefas__descricao"
          value={description}
          disabled={!isEditing}
          onKeyDown={handleKeyDown}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="Tarefas__icons">
          <a onClick={editarTarefa}>
            <img src="/edit.svg" alt="Editar" />
          </a>
          <a onClick={apagarTarefa}>
            <img src="/trash.svg" alt="Excluir" />
          </a>
        </div>
      </li>
    </div>
  );
}
