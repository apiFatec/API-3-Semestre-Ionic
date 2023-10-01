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
  const [reload, setReload] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>();
  const [process, setProcess] = useState<Processes>({
    id: "",
    deadline: "",
    tasks: [],
    name: "",
    description: "",
  });

  useEffect(() => {
    getProcess(id);
  }, [reload]);

  const toggleModal = (task: Task) => {
    setCurrentTask(!showModal ? task : undefined);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  async function getProcess(id: string | undefined) {
    if (id) {
      processService
        .getOne(id)
        .then((response) => {
          setProcess(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-12 gap-4">
      <section className="flex-row w-full ">
        <div className="flex flex-col gap-8 w-1/2 mb-16">
          <div className="flex flex-col ">
            <h1 className="font-thin text-4xl ">Processo XPTO</h1>
          </div>
        </div>
        <div className="flex gap-12 ">
          <div>
            <a href="#" className="border-b-4  border-[#53C4CD]">
              Informações
            </a>
          </div>
          <div>
            <a href="#">Tarefas</a>
          </div>
        </div>
      </section>

      <section className="w-full grid grid-cols-2 mt-4">
        <div>
          <p>Descrição</p>
          <hr className="max-w-2xl" />
          <p className="text-sm h-20 overflow-hidden whitespace-normal break-words text-ellipsis min-h-[20rem] mt-6">
            {process.description}
          </p>
          <p>Comentários</p>
          <hr className="max-w-2xl" />
          <div className="flex items-center gap-4 mt-4">
            <img src="./Roberta.svg" alt="img" className="w-10" />
            <input
              type="text"
              placeholder="Adicionar comentário..."
              className="p-2 border-solid border w-[38.5rem] rounded"
            />
          </div>
        </div>
        <section>
          <div className="flex gap-6">
            <div>
              <p className="">Planejamento</p>
              <hr className="w-72" />
              <p className="text-xs text-slate-500 overflow-hidden whitespace-normal break-words text-ellipsis mt-4 ">
                Prazo de entrega
              </p>
              <p className="mt-2 text-sm">{process.deadline}</p>
            </div>
            <div>
              <p className="">Regulatório</p>
              <hr className="w-72" />
              <p className="text-xs h-20 text-slate-500 overflow-hidden whitespace-normal break-words text-ellipsis mt-4 ">
                Requisitos
              </p>
            </div>
          </div>
          <div>
            <h2 className="mt-40 text-xl">Minhas tarefas</h2>
          </div>
        </section>
      </section>

      {showModal && (
        <TaskModal
          task={currentTask}
          description={currentTask?.description}
          id={currentTask?.id}
          members={"currentTask?"}
          priority={currentTask?.priority}
          title={currentTask?.title}
          toggleModal={toggleModal}
          closeModal={closeModal}
          reload={reload}
          setReload={setReload}
        />
      )}
    </div>
  );
}
