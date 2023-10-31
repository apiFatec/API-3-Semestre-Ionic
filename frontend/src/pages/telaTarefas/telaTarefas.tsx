import { PhotoProfile } from "@/components/photoProfile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuth from "@/hooks/useAuth";
import { Processes } from "@/interfaces/processes";
import { Tasks } from "@/interfaces/tasks";
import processService from "@/services/processService";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function TelaTarefas() {
  const { id } = useParams();
  const { role } = useAuth();
  const [process, setProcess] = useState<Processes>();

  const deadline = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${deadline.getDate()} ${months[deadline.getMonth()]
    } ${deadline.getFullYear()}`;

  async function getProcess(id: string | undefined) {
    if (id) {
      processService
        .getOne(id)
        .then((response) => {
          const data = response.data;
          setProcess(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const altaPrioridadeTasks = process?.tasks?.filter(
    (task) => task.priority === "Alta"
  );
  const mediaPrioridadeTasks = process?.tasks?.filter(
    (task) => task.priority === "Média"
  );
  const baixaPrioridadeTasks = process?.tasks?.filter(
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
  async function handleDelete(id: string) {
    try {
      await processService.deleteTask(id);
      setProcess((prevProcess) => {
        if (prevProcess?.tasks) {
          return {
            ...prevProcess,
            tasks: prevProcess.tasks.filter((task) => task.id !== id),
          };
        }
        return prevProcess;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="px-12">
      <section className="flex-row w-full mb-6">
        <div className="flex gap-12 ">
          <div>
            <Link to={`/processos/${encodeURIComponent(process?.name!)}/${process?.id}`}>
              Informações
            </Link>
          </div>
          <div>
            <Link to="#" className="border-b-4  border-[#53C4CD]">
              Tarefas
            </Link>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-3 w-[90%] justify-between ">
        <div className="flex flex-col w-full gap-3 max-h-[580px] ">
          <p>Backlog</p>
          <ScrollArea className="h-full w-[25rem]">
            {orderedTasks?.map((task) => {
              if (task.status === "Aguardando") {
                return (
                  <div className="flex flex-col w-[23rem] p-3 mb-3 justify-items-start cursor-pointer border rounded" key={task.id}>
                    <div className="flex justify-between">
                      <p className="text-sm ">{task.title}</p>
                      <Popover>
                        <PopoverTrigger className="cursor-pointer text-slate-500 text-5xl ">
                          <MoreHorizontal size={28} color="#999999" />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto ">
                          <div className="flex items-center cursor-pointer hover:bg-gray-200 hover:duration-200 px-2 rounded gap-2">
                            <Pencil size={18} />
                            <p className=" text-center  "> Editar</p>
                          </div>
                          <div className="flex items-center cursor-pointer hover:bg-gray-200 hover:duration-200 px-2 rounded gap">
                            <Trash size={18} />
                            <button
                              type="button"
                              onClick={() => handleDelete(task.id)}
                              className="cursor-pointer text-center hover:bg-gray-200 hover:duration-200 px-2 rounded"
                            >
                              Excluir
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs mt-4 max-w-[20rem]">
                      {task.description}
                    </p>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                        {formattedDate}
                      </p>
                      <PhotoProfile />
                    </div>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Em progresso</p>
          <ScrollArea className="h-full w-[25rem]">
            {orderedTasks?.map((task) => {
              if (task.status === "Em progresso") {
                return (
                  <div className="flex flex-col w-[23rem] p-3 mb-3 justify-items-start cursor-pointer border rounded" key={task.id}>
                    <div className="flex justify-between">
                      <p className="text-sm ">{task.title}</p>
                      <Popover>
                        <PopoverTrigger className="cursor-pointer text-slate-500 text-5xl ">
                          <MoreHorizontal size={28} color="#999999" />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto ">
                          <div className="flex items-center cursor-pointer hover:bg-gray-200 hover:duration-200 px-2 rounded gap-2">
                            <Pencil size={18} />
                            <p className=" text-center  "> Editar</p>
                          </div>
                          <div className="flex items-center cursor-pointer hover:bg-gray-200 hover:duration-200 px-2 rounded gap">
                            <Trash size={18} />
                            <button
                              type="button"
                              onClick={() => handleDelete(task.id)}
                              className="cursor-pointer text-center hover:bg-gray-200 hover:duration-200 px-2 rounded"
                            >
                              Excluir
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs mt-4 max-w-[20rem]">
                      {task.description}
                    </p>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                        {formattedDate}
                      </p>
                      <PhotoProfile />
                    </div>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Finalizado</p>
          <ScrollArea className="h-full w-[25rem]">
            {orderedTasks?.map((task) => {
              if (task.status === "Finalizado") {
                return (
                  <div className="flex flex-col w-[23rem] p-3 mb-3 justify-items-start cursor-pointer border rounded" key={task.id}>
                    <div className="flex justify-between">
                      <p className="text-sm ">{task.title}</p>
                      <Popover>
                        <PopoverTrigger className="cursor-pointer text-slate-500 text-5xl ">
                          <MoreHorizontal size={28} color="#999999" />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto ">
                          <div className="flex items-center cursor-pointer hover:bg-gray-200 hover:duration-200 px-2 rounded gap-2">
                            <Pencil size={18} />
                            <p className=" text-center  "> Editar</p>
                          </div>
                          <div className="flex items-center cursor-pointer hover:bg-gray-200 hover:duration-200 px-2 rounded gap">
                            <Trash size={18} />
                            <button
                              type="button"
                              onClick={() => handleDelete(task.id)}
                              className="cursor-pointer text-center hover:bg-gray-200 hover:duration-200 px-2 rounded"
                            >
                              Excluir
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs mt-4 max-w-[20rem]">
                      {task.description}
                    </p>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                        {formattedDate}
                      </p>
                      <PhotoProfile />
                    </div>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
