import { Input } from "@/components/InputForm";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import processService from "@/services/processService";
import { useNavigate } from "react-router-dom";
import { ProcessFormValues } from "@/interfaces/processFormValues";
import { Users } from "@/interfaces/users";
import { Tasks } from "@/interfaces/tasks";
import { Badge } from "@/components/ui/badge";
import teamsService from "@/services/teamsService";
import { Teams } from "@/interfaces/teams";
import { TitleContext } from "@/contexts/TitleContext";
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
import isoService from "@/services/isoService";
import { SelectForm } from "@/components/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Isos {
  title: string;
}

export function CadastroProcessos() {
  const { handleTitle } = useContext(TitleContext);

  const { register, handleSubmit, watch } = useForm<ProcessFormValues>();
  const [priority, setPriority] = useState("Baixa");
  const [titleTask, setTitleTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [teamLeader, setTeamLeader] = useState<Users>();
  const [team, setTeam] = useState<Teams | undefined>();
  const [open, setOpen] = useState(false)
  const [isos, setIsos] = useState<Isos[]>([]);
  const [selectedIsos, setSelectedIsos] = useState<Isos[]>([]);
  const [process, setProcesss] = useState<ProcessFormValues[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    getIsos();
    handleTitle("Criar Processo")
  }, []);

  async function getUsers() {
    teamsService.getAll()
      .then((response) => {
        setTeams(response.data);
        setTeamLeader(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getIsos() {
    isoService.getIsos()
      .then((response) => {
        setIsos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  function handleChange(event: any) {
    const { value, checked } = event.target;

    const parsedValue = JSON.parse(value);

    if (checked) {
      setTeam(parsedValue);
    } else {
      setTeam(undefined);
    }
  }

  const createProcess: SubmitHandler<ProcessFormValues> = () => {
    const processo: ProcessFormValues = {
      name: title,
      description: description,
      deadline: deadline,
      tasks: tasks,
      team: team!,
      leader: team!.leader,
    };
    processService
      .createProcess(processo)
      .then((response) => {
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
    setTitleTask("");
    setDescriptionTask("");
    setTasks((prevState) => [...prevState, tarefa]);
  }

  function removeTask(deletedTask: string) {
    const filteredTasks = tasks.filter(
      (task) => task.title !== deletedTask)
    setTasks(filteredTasks);
  }

  function addIso(title: string) {
    const selectedIso: Isos = {
      title: title
    }
    setSelectedIsos((prevState) => [...prevState, selectedIso]);
  }

  function removeIso(deletedIso: string) {
    const filteredIso = selectedIsos.filter(
      (iso) => iso.title !== deletedIso)
    setSelectedIsos(filteredIso)
  }

  function handleTaskValue(key: string, value: string) {
    switch (key) {
      case "title":
        setTitleTask(value);
        break;
      case "description":
        setDescriptionTask(value);
        break;
    }
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
                        + Adicionar Requisito
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="z-10 w-[16.875rem] border rounded-md mt-1 bg-white dark:bg-secondary p-4 cursor-pointer">
                      <Command>
                        <CommandInput className="p-2 focus:outline-none dark:text-black" placeholder="Procurar iso" />
                        <CommandEmpty>Nenhum requisito encontrado</CommandEmpty>
                        <CommandGroup className="">
                          {isos.map((iso) => (
                            <CommandItem
                              className="flex"
                              value={iso.title}
                              onSelect={(currentValue: string) => {
                                addIso(currentValue)
                                setOpen(false)
                              }
                              }
                            >
                              {iso.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <ScrollArea className="z-0 mt-2 h-[8.5rem] w-[16.875rem]">
                    {selectedIsos.length === 0 &&
                      <div className="grid justify-items-center">
                        <label className="w-36 text-center text-[#777777]">Nenhum requisito adicionado</label>
                      </div>
                    }
                    {selectedIsos.map((isoSel, index) => (
                      <section key={index} className="flex justify-between p-[4px] mt-1 mb-2 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                        <span className="px-2">{isoSel.title}</span>
                        <button type="button" className="px-2 text-sm" onClick={() => removeIso(isoSel.title)}>X</button>
                      </section>
                    ))}

                  </ScrollArea>
                </div>
              </div>
              <div className="ml-2">
                <div className="center-normal py-2">
                  <label>Atribuir uma equipe</label>
                  <ScrollArea
                    id="teamList"
                    className="mt-2 p-4 h-[10rem] w-[16.875rem] rounded-md border"
                  >
                    {teams.map((teams) => (
                      // if (teams.id !== teamLeader?.id)
                      //  return ( 
                      <label
                        key={teams.id}
                        htmlFor={teams.id}
                        className="flex p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]"
                      >
                        <input
                          id={teams.id}
                          type="checkbox"
                          value={JSON.stringify(teams)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {teams.name}
                      </label>
                      // {/* ); */ }
                    ))}
                  </ScrollArea>
                </div>

                <HoverCard>
                  <HoverCardTrigger>
                    <SelectForm
                      deactive={!team}
                      label="Líder responsável do processo"
                      id="lider"
                      setValue={(e: Users) => (setTeamLeader(e), console.log(e))}
                      users={team?.users}
                      value={team?.users[-1]}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Por favor, selecione primeiro um time para o processo.
                  </HoverCardContent>
                </HoverCard>

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
                setValue={(e: string) => handleTaskValue('title', e)}
              />
              <TextArea
                label="Descrição"
                id="descriptionTask"
                setValue={(e: string) => handleTaskValue('description', e)}
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

