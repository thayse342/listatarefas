import React, { useEffect, useState } from "react";
import "./style.scss";
import { TarefasService } from "../../api/TarefasService";
import Tarefas from "../Tarefas";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleDescricao = async () => {
    const descricao = document.getElementById("descricao").value;

    if (descricao != "") {
      const body = {
        descricao: descricao,
        concluido: 0,
      };
      const { status } = await TarefasService.criarTarefa(body);
      if (status === 200) {
        location.reload();
      } else {
        alert("Erro");
      }
    } else {
      alert("Tem que escrever uma descrição");
    }
  };

  const getTarefas = async () => {
    const { data } = await TarefasService.getTarefas();
    setTarefas(data.data);
  };

  const getTarefasByText = async () => {
    const descricao = document.getElementById("busca").value;
    const body = {
      descricao: descricao,
    };

    const { data } = await TarefasService.getTarefasByText(body);
    setTarefas(data.data);
    console.log(data);
  };

  useEffect(() => {
    getTarefas();
  }, []);

  return (
    <div className="Home">
      <div className="Home__title">
        <h1>Meu Cotidiano</h1>
      </div>

      <div className="Home__line"></div>
      <div className="Home__adicionar_tarefa">
        <input id="descricao" placeholder="Digite sua tarefa:" />
        <a onClick={handleDescricao}>
          <div>+</div>
        </a>
      </div>
      <div className="Home__adicionar_tarefa">
        <input id="busca" placeholder="Pesquisar tarefa:" />
        <a onClick={getTarefasByText}>
          <div>
            <img src="/lupa.svg" />
          </div>
        </a>
      </div>
      <ul>
        <ul>
          {tarefas.map((tarefa) => (
            <Tarefas
              key={tarefa.id}
              id_tarefa={tarefa.id}
              descricao={tarefa.descricao}
              concluido={tarefa.concluido}
            />
          ))}
        </ul>
      </ul>

      <div className="tarefas">
        <span></span>
      </div>
    </div>
  );
}
