import { Task } from "@/components/taskCard";
import { useState, useEffect } from "react";
import processService from "@/services/processService";
import { useParams } from "react-router";
import { Progress } from "@/components/ui/progress";

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
  const [reload] = useState<boolean>(false);
  const [process, setProcess] = useState<Processes>({
    id: "",
    deadline: "",
    tasks: [],
    name: "",
    description: "",
  });

  const completedTaskCounter = process.tasks
    ? process.tasks.filter((task) => task.status === "INPROGRESS").length
    : 0;

  const totalTaskCounter = process.tasks ? process.tasks.length : 0;

  useEffect(() => {
    getProcess(id);
  }, [reload]);

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
            <p className="text-slate-500 text-xs">
              {completedTaskCounter}/{totalTaskCounter} Tarefas concluídas
            </p>
            <Progress
              className="w-[78%] h-2 bg-gray-200 mt-5"
              value={completedTaskCounter}
            />
            {process.tasks &&
              process.tasks
                .filter(
                  (task) =>
                    task.priority === "HIGH" && task.status === "WAITING"
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex gap-5 -center mt-6 items-center"
                  >
                    <input
                      type="checkbox"
                      id={`taskCheck-${task.id}`}
                      className="appearance-none w-14 h-10 border rounded-full focus:outline-none checked:bg-[#53C4CD]"
                    />
                    <div>
                      <h2>{task.title}</h2>
                      <p className="text-gray-500 text-xs max-w-[78%]">
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </section>
    </div>
  );
}
