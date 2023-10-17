import { useState, useEffect, useContext } from "react";
import userService from "@/services/userServices";
import processService from "@/services/processService";
import { useParams } from "react-router";
import { Progress } from "@/components/ui/progress";
import { TitleContext } from "@/contexts/TitleContext";
import { Tasks } from "@/interfaces/tasks";
import { Processes } from "@/interfaces/processes";
import { TaskModal } from "@/components/taskModal";

export function Process() {
  const { id } = useParams();
  const { handleTitle } = useContext(TitleContext);
  const [process, setProcess] = useState<Processes>({
    id: "",
    deadline: "",
    tasks: [],
    name: "",
    description: "",
  });
  const [task, setTask] = useState<Tasks>({
    id: '',
    title: '',
    description: '',
    status: '',
    priority: '',
    deadline: undefined,
  })
  const [modalTask, setModalTask] = useState<any>(false);

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

  async function showModalTask(item: Tasks) {
    setModalTask(!modalTask);
    setTask(item)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-12 gap-4">
      <section className="flex-row w-full ">
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
          <p className="w-11/12 border-b ">Descrição</p>
          <p className="text-sm h-20 overflow-hidden whitespace-normal break-words text-ellipsis min-h-[20rem] mt-6 max-w-xl">
            {process.description}
          </p>
          <p className="w-11/12 border-b ">Comentários</p>

          <div className="flex items-center gap-4 mt-4">
            <img src="./Roberta.svg" alt="img" className="w-10" />
            <input
              type="text"
              placeholder="Adicionar comentário..."
              className="p-2 border-solid border w-9/12 rounded"
            />
          </div>
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
              if (task.status === "Aguardando") {
                return (
                  <div
                    key={task.id}
                    className="flex gap-5 -center mt-6 items-center justify-between max-w-lg  "
                  >
                    <div className="max-w-sm ">
                      <h2 className="break-words">{task.title}</h2>
                      <p className="text-gray-500 text-xs max-w-9/12 break-words">
                        {task.description}
                      </p>
                    </div>
                    {task.priority === "Média" && (
                      <div className="ml-52">
                        <p className="text-amber-500 text-sm max-w-9/12 break-words pl-6 pr-6 rounded bg-amber-100 text-center">
                          {task.priority}
                        </p>
                        <button
                          id={`taskCheck-${task.id}`}
                          className="text-sm"
                          onClick={() => showModalTask(task)}
                        >
                          Detalhes da Tarefa
                        </button>
                      </div>
                    )}
                    {task.priority === "Alta" && (
                      <div className="ml-52">
                        <p className="bg-red-200 text-sm max-w-9/12 break-words pl-6 pr-6 rounded text-amber-700 text-center">
                          {task.priority}
                        </p>
                        <button
                          id={`taskCheck-${task.id}`}
                          className="text-sm"
                          onClick={() => showModalTask(task)}
                        >
                          Detalhes da Tarefa
                        </button>
                      </div>
                    )}
                    {task.priority === "Baixa" && (
                      <div className="ml-52">
                        <p className="bg-green-200 text-sm max-w-9/12 break-words pl-6 pr-6 rounded text-green-600 text-center">
                          {task.priority}
                        </p>
                        <button
                          id={`taskCheck-${task.id}`}
                          className="text-sm"
                          onClick={() => showModalTask(task)}
                        >
                          Detalhes da Tarefa
                        </button>
                      </div>
                    )}
                  </div>
                );
              } else if (task.status === "Em progresso") {
                return (
                  <div
                    key={task.id}
                    className="flex gap-5 -center mt-6 items-center justify-between max-w-lg"
                  >
                    <input
                      type="checkbox"
                      id={`taskCheck-${task.id}`}
                      className="appearance-none w-12 h-12 border rounded-full focus:outline-none checked:bg-[#53C4CD]"
                      onClick={() => completeTask(task.id)}
                    />
                    <div className="max-w-sm">
                      <h2 className="break-words">{task.title}</h2>
                      <p className="text-gray-500 text-xs max-w-9/12 break-words">
                        {task.description}
                      </p>
                    </div>
                    {task.priority === "Baixa" && (
                      <div className="ml-36">
                        <p className="bg-green-200 text-sm max-w-9/12 break-words pl-6 pr-6 rounded text-green-600 text-center">
                          {task.priority}
                        </p>
                        <button
                          id={`taskCheck-${task.id}`}
                          className="text-sm"
                          onClick={() => showModalTask(task)}
                        >
                          Detalhes da Tarefa
                        </button>
                        <div className="h-4"></div>
                      </div>
                    )}
                    {task.priority === "Média" && (
                      <div className="ml-36">
                        <p className="text-amber-500 text-sm max-w-9/12 pl-6 pr-6 break-words rounded bg-amber-100 text-center">
                          {task.priority}
                        </p>
                        <button
                          id={`taskCheck-${task.id}`}
                          className="text-sm"
                          onClick={() => showModalTask(task)}
                        >
                          Detalhes da Tarefa
                        </button>
                        <div className="h-4"></div>
                      </div>
                    )}
                    {task.priority === "Alta" && (
                      <div className="ml-36">
                        <p className="bg-red-200 text-sm max-w-9/12 pl-6 pr-6 break-words rounded text-amber-700 text-center">
                          {task.priority}
                        </p>
                        <button
                          id={`taskCheck-${task.id}`}
                          className="text-sm"
                          onClick={() => showModalTask(task)}
                        >
                          Detalhes da Tarefa
                        </button>
                        <div className="h-4"></div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
          {modalTask && (
            <>
              <TaskModal id={task.id} title={task.title} members={undefined} description={task.description}
                priority={task.priority} toggleModal={function (task: Tasks): void {
                  throw new Error("Function not implemented.");
                }} closeModal={function (): void {
                  throw new Error("Function not implemented.");
                }} setReload={function (state: boolean): void {
                  throw new Error("Function not implemented.");
                }} reload={false} />
            </>
          )}

        </section>
      </section>
    </div>
  );
}
