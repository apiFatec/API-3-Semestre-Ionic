import DropdownPessoa from "@/components/buttons/DropdownPessoa";
import CheckboxDemo from "@/components/buttons/CheckBox";
import { ScrollArea } from "@/components/ui/scrollarea";
import CircularTotalProgressBar from "@/components/progressBars/CircleTotalProgressBar";
import CircularDiarioProgressBar from "@/components/progressBars/CircleDiarioProgressBar";

import "@/styles/visaoDetalhada/estiloComponente/scrollArea.css";

import "@/styles/visaoDetalhada/estiloPagina/navigation.css";
import "@/styles/visaoDetalhada/estiloPagina/descricao.css";
import "@/styles/visaoDetalhada/estiloPagina/andamento.css";
import "@/styles/visaoDetalhada/estiloPagina/processo.css";
import "@/styles/visaoDetalhada/estiloPagina/tarefas.css";

import notificacao from "@/assets/visaoDetalhada/notificacao.svg";
import linha from "@/assets/visaoDetalhada/linha.svg";
import alvo from "@/assets/visaoDetalhada/Alvo.svg";
import checklist from "@/assets/visaoDetalhada/checkList.svg";
import { useState, useEffect } from "react";
import userServices from "@/services/userServices";

interface Task {
  id: string;
  status: string;
  title: string;
  deadline: any;
  description: string;
}

interface Processes {
  id: string | undefined;
  deadline: string | undefined;
  tasks: Array<Task> | undefined;
  name: string | undefined;
  description: string | undefined;
}

function VisaoDetalhada() {
  const [currentTask, setCurrentTask] = useState<string>("");
  const [processo, setProcesso] = useState<Processes>();
  const [reRender, setRerender] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getProcess();
  }, []);

  function getProcess() {
    userServices
      .getProcess()
      .then((response) => {
        console.log(response);
        setProcesso(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function finalizarTarefa(index: number, description: string, task: Task) {
    setCurrentTask(description)
    task.status = task.status === "finalizado"  ? "aguardando" : "finalizado";
    if (processo && processo.tasks && index >= 0 && index < processo.tasks.length) {
      processo.tasks[index] = task;
      setRerender(!reRender);
      console.log("aaaaaaaaa");
    } else {
      console.error("Índice de tarefa inválido ou processo não encontrado.");
    }
  }

  return (
    <div className="body">
      <nav className="flex">
        <div className="container">
          <img src={notificacao} alt="" className="notificacao" />
          <img src={linha} alt="" />
          <DropdownPessoa />
        </div>
      </nav>

      <section className="visaoDetalhada_processo_gridPai">
        <section className="visaoDetalhada_hoje">
          <h1 className="visaoDetalhada_tituloHoje">Hoje</h1>
          <p className="visaoDetalhada_dataHoje">09/08/2023</p>
          <br />
          <h1 className="visaoDetalhada_processo">{processo?.name}</h1>
          <p className="visaoDetalhda_processoTexto">{processo?.description}</p>
        </section>

        <section className="visaoDetalhada_andamento">
          <article className="visaoDetalhada_andamentoProcesso">
            <img src={alvo} alt="" />
            <div className="visaoDetalhada_descricaoAndamento">
              <h1 className="visaoDetalhada_andamentoTitulo">
                Andamento do processo
              </h1>
              <p className="visaoDetalhada_andamentoTexto">
                Acompanhe como está o andamento total do processo
              </p>
            </div>
            <CircularTotalProgressBar />
          </article>
          <article className="visaoDetalhada_tarefasDiarias">
            <img src={checklist} alt="" />
            <div>
              <h1 className="visaoDetalhada_andamentoTitulo">
                Tarefas diárias
              </h1>
              <p className="visaoDetalhada_andamentoTexto">
                Acompanhe como está o andamento das tarefas diárias
              </p>
            </div>
            <CircularDiarioProgressBar />
          </article>
        </section>

        <section className="visaoDetalhada_tarefas">
          <h1 className="visaoDetalhada_tarefasEstilo">Tarefas</h1>
          <ScrollArea className="visaoDetalhada_scrollArea">
            {processo?.tasks?.map((task, index) => {
              if (task.deadline === "21/09") {
                return (
                  <CheckboxDemo
                    key={task.id}
                    onclick={() => finalizarTarefa(index, task.description, task)}
                    label={task.title}
                    status={task.status}
                  />
                );
              }
            })}
          </ScrollArea>
        </section>

        <section className="visaoDetalhada_descricao">
          <p className="visaoDetalhada_detalheDescricao"></p>
          <h1>Descrição</h1>
          <ScrollArea className="visaoDetalhada_descricaoScroll">
            <p className="visaoDetalhada_textoScroll">{currentTask}</p>
          </ScrollArea>
        </section>
      </section>
    </div>
  );
}

export default VisaoDetalhada;
