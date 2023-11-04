import { useState, useEffect, useContext } from "react";
import userService from "@/services/userServices";
import processService from "@/services/processService";
import { useParams } from "react-router";
import { Progress } from "@/components/ui/progress";
import { TitleContext } from "@/contexts/TitleContext";
import { Tasks } from "@/interfaces/tasks";
import { Processes } from "@/interfaces/processes";
import userServices from "@/services/userServices";
import { useNavigate } from "react-router-dom";

export function Process() {
  const { id } = useParams();
  const { handleTitle } = useContext(TitleContext);
  const navigate = useNavigate();
  const [process, setProcess] = useState<Processes>({
    id: "",
    deadline: "",
    tasks: [],
    name: "",
    description: "",
  });
  const [task, setTask] = useState<Tasks>({
    id: "",
    title: "",
    description: "",
    status: "",
    priority: "",
    deadline: undefined,
  });
  const [user, setUser] = useState<any>();

  const deadline = new Date();
  const formattedDate = `${deadline.getDate()}/${
    deadline.getMonth() + 1
  }/${deadline.getFullYear()}`;
  const formattedTime = `${String(deadline.getHours()).padStart(
    2,
    "0"
  )}:${String(deadline.getMinutes()).padStart(2, "0")}`;
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  const completedTaskCounter = process.tasks
    ? process.tasks.filter((task) => task.status === "Finalizado").length
    : 0;

  const totalTaskCounter = process.tasks ? process.tasks.length : 0;

  const taskPercentage =
    totalTaskCounter > 0 ? (completedTaskCounter / totalTaskCounter) * 100 : 0;

  const altaPrioridadeTasks = process.tasks?.filter(
    (task) => task.priority === "Alta"
  );
  const mediaPrioridadeTasks = process.tasks?.filter(
    (task) => task.priority === "Média"
  );
  const baixaPrioridadeTasks = process.tasks?.filter(
    (task) => task.priority === "Baixa"
  );

  let orderedTasks: Tasks[] = [];
  if (altaPrioridadeTasks && mediaPrioridadeTasks && baixaPrioridadeTasks) {
    orderedTasks = [
      ...altaPrioridadeTasks,
      ...mediaPrioridadeTasks,
      ...baixaPrioridadeTasks,
    ];
  }
  useEffect(() => {
    getProcess(id);
  }, []);

  async function getProcess(id: string | undefined) {
    if (id) {
      processService
        .getOne(id)
        .then((response) => {
          const data = response.data;
          setProcess(data);
          handleTitle(data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function completeTask(id: string | undefined) {
    try {
      await userService.finishTask(id);
      const updatedTasks = process.tasks?.map((task) =>
        task.id === id ? { ...task, status: "Finalizado" } : task
      );
      setProcess((prev) => ({ ...prev, tasks: updatedTasks }));
    } catch (error) {
      console.error("Erro ao concluir a tarefa:", error);
    }
  }

  async function joinTask(updateTask: Tasks) {
    try {
      const userToken = localStorage.getItem("token");
      await userService.joinTask({ task: updateTask, user: userToken });
      if (id && process.tasks) {
        const updatedTasks = process.tasks.map((task) =>
          task.id === updateTask.id ? { ...task, status: "Em progresso" } : task
        );

        setProcess((prev) => ({ ...prev, tasks: updatedTasks }));
      }
    } catch (error) {
      console.error("Erro ao ingressar na tarefa:", error);
    }
  }

  function nav() {
    navigate(`/telaTarefas/${encodeURIComponent(process.name!)}/${process.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-12 gap-4">
      <section className="flex-row w-full mb-6">
        <div className="flex gap-12 ">
          <div>
            <a href="#" className="border-b-4  border-[#53C4CD]">
              Informações
            </a>
          </div>
          <div>
            <a href="#" onClick={() => nav()}>
              Tarefas
            </a>
          </div>
        </div>
      </section>

      <section className="w-full grid grid-cols-2 mt-4">
        <div>
          <p className="w-11/12 border-b ">Descrição</p>
          <p className="text-sm h-20 overflow-hidden whitespace-normal break-words text-ellipsis min-h-[20rem] mt-6 max-w-xl">
            {process.description}
          </p>
          {/* <p className="w-11/12 border-b ">Comentários</p>

          <div className="flex items-center gap-4 mt-4">
            <img src="./Roberta.svg" alt="img" className="w-10" />
            <input
              type="text"
              placeholder="Adicionar comentário..."
              className="p-2 border-solid border w-9/12 rounded"
            />
          </div> */}
        </div>
        <section>
          <div
            className="flex gap-14
           justify-start"
          >
            <div className="w-1/3">
              <p className="border-b">Planejamento</p>

              <p className="text-xs text-slate-500 overflow-hidden whitespace-normal break-words text-ellipsis mt-4 ">
                Prazo de entrega
              </p>
              <p className="mt-2 text-sm">{formattedDateTime}</p>
            </div>
            <div className="w-1/3">
              <p className="border-b">Regulatório</p>

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
              className="w-9/12 h-2 bg-gray-200 mt-5"
              value={taskPercentage}
            />
            {orderedTasks?.map((task) => {
              const isCompleted = task.status === "Finalizado";
              if (task.status === "Aguardando") {
                return (
                  <div
                    key={task.id}
                    className="flex gap-5 - mt-6 items-center justify-between max-w-lg  "
                  >
                    <div className="flex items-center gap-5">
                      <input
                        type="checkbox"
                        id={`taskCheck-${task.id}`}
                        className="appearance-none w-12 h-12 border rounded-full focus:outline-none checked:bg-[#53C4CD]"
                        onClick={() => completeTask(task.id)}
                        checked={isCompleted}
                        disabled={isCompleted}
                      />
                      <div className="flex flex-col max-w-xs">
                        <h2 className="break-words max-w-fit line-clamp-1">
                          {task.title}
                        </h2>
                        <p className="text-gray-500 text-xs max-w-9/12 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    {task.priority === "Média" && (
                      <div className="flex max-w-9/12">
                        <p className="text-amber-500 text-sm rounded-lg bg-amber-100 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                    {task.priority === "Alta" && (
                      <div className="flex max-w-9/12">
                        <p className="text-amber-700 text-sm rounded-lg bg-red-200 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                    {task.priority === "Baixa" && (
                      <div className="flex max-w-9/12">
                        <p className="text-green-600 text-sm rounded-lg bg-green-200 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                  </div>
                );
              } else if (task.status === "Finalizado") {
                return (
                  <div
                    key={task.id}
                    className="flex gap-5 - mt-6 items-center justify-between max-w-lg  "
                  >
                    <div className="flex items-center gap-5">
                      <input
                        type="checkbox"
                        id={`taskCheck-${task.id}`}
                        className="appearance-none w-12 h-12 border rounded-full focus:outline-none checked:bg-[#53C4CD]"
                        onClick={() => completeTask(task.id)}
                        checked={isCompleted}
                        onChange={() => completeTask(task.id)}
                      />
                      {isCompleted && (
                        <svg
                          className="w-9  h-9 absolute"
                          fill="none"
                          viewBox="0 0 18 23"
                          stroke="white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      <div className="flex flex-col max-w-xs">
                        <h2 className="break-words max-w-fit line-clamp-1">
                          {task.title}
                        </h2>
                        <p className="text-gray-500 text-xs max-w-9/12 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    {task.priority === "Média" && (
                      <div className="flex max-w-9/12">
                        <p className="text-amber-500 text-sm rounded-lg bg-amber-100 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                    {task.priority === "Alta" && (
                      <div className="flex max-w-9/12">
                        <p className="text-amber-700 text-sm rounded-lg bg-red-200 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                    {task.priority === "Baixa" && (
                      <div className="flex max-w-9/12">
                        <p className="text-green-600 text-sm rounded-lg bg-green-200 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                  </div>
                );
              } else if (task.status === "Em progresso") {
                return (
                  <div
                    key={task.id}
                    className="flex gap-5 - mt-6 items-center justify-between max-w-lg  "
                  >
                    <div className="flex items-center gap-5">
                      <input
                        type="checkbox"
                        id={`taskCheck-${task.id}`}
                        className="appearance-none w-12 h-12 border rounded-full focus:outline-none checked:bg-[#53C4CD]"
                        onClick={() => completeTask(task.id)}
                        checked={isCompleted}
                        disabled={isCompleted}
                      />
                      <div className="flex flex-col max-w-xs">
                        <h2 className="break-words max-w-fit line-clamp-1">
                          {task.title}
                        </h2>
                        <p className="text-gray-500 text-xs max-w-9/12 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    {task.priority === "Média" && (
                      <div className="flex max-w-9/12">
                        <p className="text-amber-500 text-sm rounded-lg bg-amber-100 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                    {task.priority === "Alta" && (
                      <div className="flex max-w-9/12">
                        <p className="text-amber-700 text-sm rounded-lg bg-red-200 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                    {task.priority === "Baixa" && (
                      <div className="flex max-w-9/12">
                        <p className="text-green-600 text-sm rounded-lg bg-green-200 p-2 text-center w-full">
                          {task.priority}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
