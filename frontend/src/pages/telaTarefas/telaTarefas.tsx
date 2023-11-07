import { PhotoProfile } from "@/components/photoProfile";
import { TaskModal } from "@/components/taskModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TitleContext } from "@/contexts/TitleContext";
import useAuth from "@/hooks/useAuth";
import { Processes } from "@/interfaces/processes";
import { Tasks } from "@/interfaces/tasks";
import processService from "@/services/processService";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function TelaTarefas() {
  const { process: processName, id } = useParams();
  const { handleTitle } = useContext(TitleContext);
  const { role } = useAuth();
  const [process, setProcess] = useState<Processes>();
  const [task, setTask] = useState<Tasks>();
  const [modalTask, setModalTask] = useState<boolean>(false);

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

  useEffect(() => {
    getProcess(id!);
    handleTitle(processName!);
  }, [id]);

  async function getProcess(id: string) {
    processService.getOne(id!)
      .then((response) => {
        const data = response.data;
        setProcess(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
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
    getProcess(id!);
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
  function showModalTask(item: Tasks) {
    setTask(item);
    setModalTask(true);
  }

  return (
    <div className="flex flex-col px-12">
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

      <div className="flex w-full gap-6">
        <div className="max-h-[580px] overflow-auto w-full flex flex-col gap-3">
          <p>Backlog</p>

          {process?.tasks?.map((task) => {
            if (task.status === "Aguardando") {
              return (
                <div
                  className="flex flex-col p-3 mb-3 justify-items-start cursor-pointer border rounded"
                  key={task.id}
                >
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
                  <div onClick={() => showModalTask(task)}>
                    <p className="text-xs mt-4 max-w-[20rem]">
                      {task.description}
                    </p>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                        {formattedDate}
                      </p>
                      {task.users?.slice(0, 2).map((user, index) => (
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={user.profileImage} />
                          <AvatarFallback>{"TE"}</AvatarFallback>
                        </Avatar>
                      )
                      )}
                      {task.users?.length - 2 > 0 && (
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarFallback>+{task.users?.length - 2}</AvatarFallback>
                        </Avatar>
                      )
                      }
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="max-h-[580px] overflow-auto w-full flex flex-col gap-3">
          <p>Em Progresso</p>
          {process?.tasks?.map((task) => {
            if (task.status === "Em progresso") {
              return (
                <div
                  className="flex flex-col p-3 mb-3 justify-items-start cursor-pointer border rounded"
                  key={task.id}
                >
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
                  <div onClick={() => showModalTask(task)}>
                    <p className="text-xs mt-4 max-w-[20rem]">
                      {task.description}
                    </p>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                        {formattedDate}
                      </p>
                      {task.users?.slice(0, 2).map((user, index) => (
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={user.profileImage} />
                          <AvatarFallback>{"TE"}</AvatarFallback>
                        </Avatar>
                      )
                      )}
                      {task.users?.length - 2 > 0 && (
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarFallback>+{task.users?.length - 2}</AvatarFallback>
                        </Avatar>
                      )
                      }
                    </div>
                  </div>

                </div>
              );
            }
          })}
        </div>
        <div className="max-h-[580px] overflow-auto w-full flex flex-col gap-3">
          <p>Finalizado</p>
          {process?.tasks?.map((task) => {
            if (task.status === "Finalizado") {
              return (
                <div
                  className="flex flex-col p-3 mb-3 justify-items-start cursor-pointer border rounded"
                  key={task.id}
                  onClick={() => showModalTask(task)}
                >
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
                  <div>
                    <p className="text-xs mt-4 max-w-[20rem]">
                      {task.description}
                    </p>
                    <div className="mt-5 flex justify-between items-center">
                      <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                        {formattedDate}
                      </p>
                      {task.users?.slice(0, 2).map((user, index) => (
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={user.profileImage} />
                          <AvatarFallback>{"TE"}</AvatarFallback>
                        </Avatar>
                      )
                      )}
                      {task.users?.length - 2 > 0 && (
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarFallback>+{task.users?.length - 2}</AvatarFallback>
                        </Avatar>
                      )
                      }
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {modalTask && (
          <TaskModal
            id={task!.id}
            title={task!.title}
            users={task?.users}
            description={task!.description}
            priority={task!.priority}
            task={task}
            closeModal={() => {
              setModalTask(false);
            }}
          />
        )}
      </div>
      {/* <div className="flex itec gap-6">
        <div className="flex flex-col w-full gap-3 max-h-[580px] ">
          <p>Backlog</p>
          <ScrollArea className="h-full">
            {process?.tasks?.map((task) => {
              if (task.status === "Aguardando") {
                return (
                  <div
                    className="flex flex-col w-[23rem] p-3 mb-3 justify-items-start cursor-pointer border rounded"
                    key={task.id}
                  >
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
                    <div onClick={() => showModalTask(task)}>
                      <p className="text-xs mt-4 max-w-[20rem]">
                        {task.description}
                      </p>
                      <div className="mt-5 flex justify-between items-center">
                        <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                          {formattedDate}
                        </p>

                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={"sd"} />
                          <AvatarFallback>{"TE"}</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={"asd"} />
                          <AvatarFallback>{"aa"}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Em progresso</p>
          <ScrollArea className="h-full">
            {orderedTasks?.map((task) => {
              if (task.status === "Em progresso") {
                return (
                  <div
                    className="flex flex-col w-[23rem] p-3 mb-3 justify-items-start cursor-pointer border rounded"
                    key={task.id}
                  >
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
                    <div onClick={() => showModalTask(task)}>
                      <p className="text-xs mt-4 max-w-[20rem]">
                        {task.description}
                      </p>
                      <div className="mt-5 flex justify-between items-center">
                        <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                          {formattedDate}
                        </p>
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={"sd"} />
                          <AvatarFallback>{"TE"}</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                          <AvatarImage src={"asd"} />
                          <AvatarFallback>{"aa"}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Finalizado</p>
          <ScrollArea className="h-full">
            {process?.tasks?.map((task) => {
              if (task.status === "Finalizado") {
                return (
                  <div
                    className="flex flex-col w-[23rem] p-3 mb-3 justify-items-start cursor-pointer border rounded"
                    key={task.id}
                  >
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
                    <div onClick={() => showModalTask(task)}>
                      <p className="text-xs mt-4 max-w-[20rem]">
                        {task.description}
                      </p>
                      <div className="mt-5 flex justify-between items-center">
                        <p className="p-0.5 text-sm bg-[#F2F2F2] rounded-xl w-28 text-center ">
                          {formattedDate}
                        </p>

                          {task.users.slice(0, 2).map((user, index) => {
                            return (
                              <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                                <AvatarImage src={"sd"} />
                                <AvatarFallback>{"TE"}</AvatarFallback>
                              </Avatar>
                            )
                          })}
                          {task.users.length - 2 > 0 && (
                            <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
                              <AvatarFallback>+{task.users.length - 2}</AvatarFallback>
                            </Avatar>
                          )
                          }
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>
        
        {modalTask && (
          <TaskModal
            id={task.id}
            title={task.title}
            members={undefined}
            description={task.description}
            priority={task.priority}
            task={task}
            closeModal={() => {
              setModalTask(false);
              window.location.reload();
            }}
          />
        )}
      </div> */}
    </div >
  );
}
