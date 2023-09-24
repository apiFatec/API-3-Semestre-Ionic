import CircularTotalProgressBar from "@/components/progressBars/CircleTotalProgressBar";
import alvo from "@/assets/visaoDetalhada/Alvo.svg";
import checklist from "@/assets/visaoDetalhada/checkList.svg";
import CircularDiarioProgressBar from "@/components/progressBars/CircleDiarioProgressBar";
import { Task } from "@/components/taskCard";
import { useState } from "react";
import { TaskModal } from "@/components/taskModal";

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

const task = {
  id: '5c684a46 - 5791 - 4e29 - b464 - c35cfce04a7b', title: 'tarefa 1', description: `Nome e Descrição do Processo:
Um campo para inserir o nome do processo.
Um campo para adicionar uma descrição ou resumo do processo para referência futura.
Responsável pelo Processo:
A capacidade de atribuir um responsável pelo processo. Pode ser um usuário específico ou uma equipe.
Etapa Inicial:
Uma seção para adicionar a primeira etapa do processo, que é a etapa de validação. Isso pode incluir:
Título da etapa.
Descrição da etapa.
Responsável pela etapa.
Prazo para conclusão da etapa.
Adicionar Etapas Adicionais:
A capacidade de adicionar múltiplas etapas ao processo.
Lista de Colaboradores Envolvidos:
Uma área para listar os colaboradores envolvidos em cada etapa.
Documentação Anexa:
A possibilidade de anexar documentos relevantes para cada etapa ou para o processo como um todo. Isso pode incluir diretrizes, formulários, modelos, etc.
Datas e Prazos:
Uma exibição visual de datas e prazos para cada etapa do processo em um formato de calendário ou linha do tempo.`, status: 'Aguardando', priority: 'Média'
}

export function Process() {
  const currentDate = formatDate(new Date());
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0 (janeiro)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-12 gap-4">
      <section className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col ">
            <h1 className="font-medium text-4xl">Hoje</h1>
            <p>{currentDate}</p>
          </div>

          <div className="flex flex-col w-3/4">
            <h2 className="font-bold text-2xl">Processo xpto</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates iusto aut laudantium repudiandae sapiente quidem itaque incidunt voluptatem.</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start w-full gap-4">
          <article className="flex gap-6">
            <img src={alvo} alt="" />
            <div className="">
              <h1 className="text-2xl">
                Andamento do processo
              </h1>
              <p className="max-w-3/4 text-base text-[#858585]">
                Acompanhe como está o andamento total do processo
              </p>
            </div>
            <CircularTotalProgressBar />
          </article>
          <article className="flex gap-6">
            <img src={checklist} alt="" />
            <div>
              <h1 className="text-2xl">
                Tarefas diárias
              </h1>
              <p className="max-w-3/4 text-base text-[#858585]">
                Acompanhe como está o andamento das tarefas diárias
              </p>
            </div>
            <CircularDiarioProgressBar />
          </article>
        </div>
      </section>
      <section className="flex justify-between items-start w-full gap-4 ">
        <div className="flex flex-col w-full gap-2">
          <p>Aguardando</p>
          <div className="flex flex-col pr-4 gap-7 overflow-auto max-h-[430px] pb-4">
            <Task showModal={() => toggleModal()} />
            <Task showModal={() => toggleModal()} />
            <Task showModal={() => toggleModal()} />

          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <p>Em progresso</p>
          <div className="flex flex-col pr-4 gap-7 overflow-auto max-h-[430px] pb-4">
            <Task showModal={() => toggleModal()} />
            <Task showModal={() => toggleModal()} />
            <Task showModal={() => toggleModal()} />
            <Task showModal={() => toggleModal()} />
            <Task showModal={() => toggleModal()} />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <p>Finalizado</p>
          <div className="flex flex-col pr-4 gap-7 overflow-auto max-h-[430px] pb-4">
            <Task showModal={() => toggleModal()} />
          </div>
        </div>
      </section>

      {showModal && (
        <TaskModal
          description={task.description}
          id={task.id}
          members={"task."}
          priority={task.priority}
          title={task.title}
          toggleModal={toggleModal}
        />
      )}
    </div>
  )
}