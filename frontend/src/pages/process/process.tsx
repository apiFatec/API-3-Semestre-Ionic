import CircularTotalProgressBar from "@/components/progressBars/CircleTotalProgressBar";
import alvo from "@/assets/visaoDetalhada/Alvo.svg";
import checklist from "@/assets/visaoDetalhada/checkList.svg";
import CircularDiarioProgressBar from "@/components/progressBars/CircleDiarioProgressBar";
import { Task } from "@/components/taskCard";
import { useState, useEffect } from "react";
import { TaskModal } from "@/components/taskModal";
import processService from "@/services/processService";
import { useParams } from "react-router";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: any;
}

export interface Processes {
  id: string | undefined;
  deadline: string | undefined;
  tasks: Array<Task> | undefined;
  name: string | undefined;
  description: string | undefined;
}

export function Process() {
  const { id } = useParams();
  const currentDate = formatDate(new Date());
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  const [process, setProcess] = useState<Processes>({
    id: '',
    deadline: '',
    tasks: [],
    name: '',
    description: '',
  });

  useEffect(() => {
    getProcess(id);
  }, [])

  const toggleModal = (task: Task) => {
    setCurrentTask(!showModal ? task : undefined);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async function getProcess(id: string | undefined) {
    console.log("aaaaaaaa");
    if (id) {
      processService.getOne(id)
        .then((response) => {
          setProcess(response.data);
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-12 gap-4">
      <section className="flex justify-between items-start mb-3 w-full">
        <div className="flex flex-col gap-8 w-1/2">
          <div className="flex flex-col ">
            <h1 className="font-medium text-4xl">Hoje</h1>
            <p>{currentDate}</p>
          </div>

          <div className="flex flex-col w-3/4">
            <h2 className="font-bold text-2xl">{process.name}</h2>
            <p className="text-sm h-20 overflow-hidden whitespace-normal break-words text-ellipsis">
              {process.description}
            </p>

          </div>
        </div>
        <div className="flex flex-col justify-between items-start w-1/2 gap-4">
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
            <CircularTotalProgressBar tasks={process?.tasks} />
          </article>
          {/* <article className="flex gap-6">
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
          </article> */}
        </div>
      </section>
      <section className="flex justify-between items-start w-full gap-4 ">
        <div className="flex flex-col w-full gap-4">
          <p>Aguardando</p>
          <div className="flex flex-col pr-4 gap-7 overflow-auto max-h-[420px] pb-4">
            {process?.tasks?.map((task) => {
              if (task.status === "Aguardando")
                return (
                  <Task
                    key={task.id}
                    showModal={() => toggleModal(task)}
                    task={task}
                  />
                )
            })}
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <p>Em progresso</p>
          <div className="flex flex-col pr-4 gap-7 overflow-auto max-h-[420px] pb-4">
            {process?.tasks?.map((task) => {
              if (task.status === "Em progresso")
                return (
                  <Task
                    key={task.id}
                    showModal={() => toggleModal(task)}
                    task={task}
                  />
                )
            })}
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <p>Finalizado</p>
          <div className="flex flex-col pr-4 gap-7 overflow-auto max-h-[420px] pb-4">
            {process?.tasks?.map((task) => {
              if (task.status === "Finalizado")
                return (
                  <Task
                    key={task.id}
                    showModal={() => toggleModal(task)}
                    task={task}
                  />
                )
            })}
          </div>
        </div>
      </section>

      {showModal && (
        <TaskModal
          description={currentTask?.description}
          id={currentTask?.id}
          members={"currentTask?"}
          priority={currentTask?.priority}
          title={currentTask?.title}
          toggleModal={toggleModal}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}