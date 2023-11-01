import { Input } from "@/components/InputForm";
import { SelectForm } from "@/components/select";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import userServices from "@/services/userServices";
import { cn } from "@/lib/utils";
import processService from "@/services/processService";
import { useNavigate } from "react-router-dom";
import { ProcessFormValues } from "@/interfaces/processFormValues";
import { Users } from "@/interfaces/users";
import { Tasks } from "@/interfaces/tasks";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "cmdk"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"

interface Isos{
  id: string;
  title: string;
}


export function CadastroProcessos() {
  const { register, handleSubmit, watch } = useForm<ProcessFormValues>();
  const [priority, setPriority] = useState("Baixa");
  const [titleTask, setTitleTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [users, setUsers] = useState<Users[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [teamLeader, setTeamLeader] = useState("");
  const [team, setTeam] = useState<Users[]>([]);
  const [open, setOpen] = useState(false)
  const [isos, setIsos] = useState<Isos[]>([]);
  const [selectedIso, setSelectedIso] = useState("");
  const [process, setProcesss] = useState<ProcessFormValues[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    userServices
      .getUser()
      .then((response) => {
        setUsers(response.data);
        setTeamLeader(response.data[0]);
        setIsos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(event: any) {
    const { value, checked } = event.target;

    const parsedValue = JSON.parse(value);

    if (checked) {
      setTeam((pre) => [...pre, parsedValue]);
    } else {
      setTeam((pre) => {
        return [...pre.filter((skill) => skill !== parsedValue)];
      });
    }
  }

  const createProcess: SubmitHandler<ProcessFormValues> = () => {
    const processo: ProcessFormValues = {
      name: title,
      description: description,
      deadline: deadline,
      tasks: tasks,
      team: team,
      leader: teamLeader,
    };
    processService
      .createProcess(processo)
      .then((response) => {
        console.log(response);
        navigate("/processos");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function addTask() {
    const tarefa: Tasks = {
      title: titleTask,
      priority: priority,
      description: descriptionTask,
      status: "Aguardando",
      deadline: "01/01/2025",
    };
    setTasks((prevState) => [...prevState, tarefa]);
  }

  function removeTask(deletedTask : string) {
    const filteredTasks = tasks.filter(
      (task) => task.title !== deletedTask)
    setTasks(filteredTasks);
  }


  return (
    <main className="">
      <form
        className="grid grid-cols-2 gap-24 place-content-evenly ml-8"
        onSubmit={handleSubmit(createProcess)}
      >
        <section className="">
          <h1 className="text-3xl">Novo Processo</h1>
          <div className="py-4">
            <Card className="grid grid-cols-2 justify-items-center w-[37.5rem] p-[1.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
              <div className="mr-2">
                <Input
                  label="Nome do processo"
                  id="name"
                  type="text"
                  setValue={setTitle}
                />
                <TextArea
                  label="Descrição"
                  id="description"
                  setValue={setDescription}
                />
                <Input
                  label="Tempo de duração"
                  id="deadline"
                  type="date"
                  setValue={setDeadline}
                />
                
                <div className="center-normal py-2">    
                    <label>Requisitos regulamentares</label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[16.875rem] h-[40px] my-2 text-[#C0C0C0] justify-between"
                        >
                          {selectedIso 
                            ? isos.find((iso) => iso.id === selectedIso)?.title 
                            : "+ Adicionar Requisito"
                          }
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[16.875rem] border rounded-md mt-1">
                        <Command>
                          <CommandInput className="p-2 focus:outline-none" placeholder="Procurar iso"/>
                          <CommandEmpty>Nenhum requisito encontrado</CommandEmpty>
                          <CommandGroup className="">
                            {isos.map((iso) => (
                              <CommandItem
                                key={iso.id}
                                value={iso.title}
                                onSelect={(currentValue) =>  {
                                  setSelectedIso(currentValue === iso.title ? "" : currentValue)
                                  setOpen(false)
                                }
                              }
                              >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedIso === iso.title ? "opacity-100" : "opacity-0"
                                )}
                              />
                                {iso.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <ScrollArea className="mt-2 p-4 h-[8.5rem] w-[16.875rem] rounded-md border">

                    </ScrollArea>
                </div>
              </div>
              <div className="ml-2">
                <SelectForm
                  label="Líder responsável do processo"
                  id="lider"
                  setValue={setTeamLeader}
                  users={users}
                  value={users[-1]}
                />
                <div className="center-normal py-2">
                  <label>Atribuir uma equipe</label>
                  <ScrollArea
                    id="teamList"
                    className="mt-2 p-4 h-[10rem] w-[16.875rem] rounded-md border"
                  >
                    {users.map((user) => {
                      if (user.id !== teamLeader)
                        return (
                          <label
                            key={user.id}
                            htmlFor={user.id}
                            className="flex p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]"
                          >
                            <input
                              id={user.id}
                              type="checkbox"
                              value={JSON.stringify(user)}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            {user.name}
                          </label>
                        );
                    })}
                  </ScrollArea>
                </div>
                <div className="center-normal py-2 mt-2">
                  <label>Tarefas</label>
                  <ScrollArea
                    id="listTasks"
                    className="mt-2 p-4 h-[13rem] w-[16.875rem] rounded-md border"
                  >
                    {tasks.length === 0 && 
                    <div className="grid justify-items-center">
                      <label className="w-36 text-center text-[#777777]">Nenhuma tarefa adicionada</label>
                    </div>
                    }
                    {tasks.map((task, index) => (
                      <section
                        key={index}
                        className="p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]"
                      >
                        
                        <div className="flex justify-between px-1 pt-1">
                          <span className="font-semibold line-clamp-2 break-all">
                            {task.title}
                          </span>
                          <div className="pl-5">
                          <button type="button" onClick={() => removeTask(task.title)}>X</button>
                        </div>
                        </div>
                        <Badge
                            className={cn(
                              "bg-secondary my-3 hover:bg-secondary",
                              task.priority === "Alta"
                                ? "text-red-600"
                                : task.priority === "Média"
                                ? "text-orange-500"
                                : "text-blue-600"
                            )}
                          >
                            {task.priority}
                          </Badge>

                        <span className="pl-2 text-[#777777] line-clamp-3">
                          {task.description}
                        </span>
                      </section>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </Card>
          </div>
        </section>
        <section className="grid justify-items-end w-[25rem]">
          <div className="grid justify-items-center">
            <Card className="grid justify-items-center w-[19rem] mt-[3.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
              <div className="p-5">
                <label>Prioridade</label>
                <Tabs id="priorityTask" defaultValue="Baixa" className="mt-2">
                  <TabsList className="grid w-[16.875rem] grid-cols-3">
                    <TabsTrigger
                      onClick={() => setPriority("Baixa")}
                      value="Baixa"
                    >
                      Baixa
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => setPriority("Média")}
                      value="Média"
                    >
                      Média
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => setPriority("Alta")}
                      value="Alta"
                    >
                      Alta
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Input
                label="Título"
                id="titleTask"
                type="text"
                setValue={setTitleTask}
              />
              <TextArea
                label="Descrição"
                id="descriptionTask"
                setValue={setDescriptionTask}
              />
              <div className="p-5">
                <Button
                  type="button"
                  onClick={() => addTask()}
                  className="w-29 h-10 rounded-xl text-sm text-black bg-white shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.25)] hover:bg-[#C0C0C0] hover:duration-150 dark:bg-[#37373F] dark:text-white dark:hover:bg-[#C0C0C0] dark:hover:duration-150"
                >
                  Adicionar Tarefa
                </Button>
              </div>
            </Card>
          </div>
          <div className="ml-52 mt-20">
            <Button
              type="submit"
              className="w-40 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-sky-600"
            >
              Criar Processo
            </Button>
          </div>
        </section>
      </form>
    </main>
  );
}
