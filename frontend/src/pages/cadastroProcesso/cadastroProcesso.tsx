import { Input } from "@/components/InputForm";
import { SelectForm } from "@/components/select";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from 'react';
import { Checkbox } from "@radix-ui/react-checkbox";

interface ProcessFormValues {
    title: string;
    description: string;
    deadline: Date;
    teamLeader: string;
    team: Array<Users>;
    tasks: Array<Tasks>;
}

interface Users {
    name: string;
}

interface Tasks {
    titleTask: string;
    priorityTask: string;
    descriptionTask: string;
}

export function CadastroProcessos() {
    const { register, handleSubmit, watch } = useForm<ProcessFormValues>();
    const [priority, setPriority] = useState('Baixa');
    const [titleTask, setTitleTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [tasks, setTasks] = useState<Tasks[]>([]);

    // const startDate = new Date();
    // const date = startDate.setDate(startDate.getDate())
    const defaultValue = new Date('01/01/2001')

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(defaultValue);
    const [teamLeader, setTeamLeader] = useState('');
    const [team, setTeam] = useState<Users[]>([]);
    const [process, setProcesss] = useState<ProcessFormValues[]>([])

    const options = [
        'opção 1',
        'opção 2',
        'opção 3',
    ]

    const createProcess: SubmitHandler<ProcessFormValues> = () => {
        const processo: ProcessFormValues = {
            title: title,
            description: description,
            teamLeader: teamLeader,
            team: team,
            deadline: deadline,
            tasks: tasks
        }
        console.log(processo)
    }
    function addTask() {
        const tarefa: Tasks = {
            titleTask: titleTask,
            priorityTask: priority,
            descriptionTask: descriptionTask
        }
        setTasks((prevState) => [...prevState, tarefa])
    }


    return (
        <main className="">
            <form
                className="grid grid-cols-2 gap-40 ml-12 content-evenly"
                onSubmit={handleSubmit(createProcess)}
            >
                <section className="">
                    <h1 className="text-3xl mt-20">Novo Processo</h1>
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
                                <div className="center-normal py-2">
                                    <label>Atribuir uma Equipe</label>
                                    <ScrollArea id="teamList" className="mt-2 p-4 h-[14.5rem] w-[16.875rem] rounded-md border">
                                        {options.map((option) => (
                                            <section className="flex p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                                                <div><Checkbox className="border-8 mr-2"
                                                onCheckedChange={() => setTeam(team)}/></div>
                                                <div className="p-1">{option}</div>
                                            </section>
                                        ))}

                                    </ScrollArea>
                                </div>
                            </div>
                            <div className="ml-2">
                                <SelectForm
                                    label="Líder responsável do processo"
                                    id="lider"
                                    setValue={setTeamLeader}
                                    options={options}
                                />

                                <Input
                                    label="Tempo de duração"
                                    id="deadline"
                                    type="date"
                                    setValue={setDeadline} />

                                <div className="center-normal py-2">
                                    <label>Tarefas</label>
                                    <ScrollArea id="listTasks" className="mt-2 p-4 h-[17rem] w-[16.875rem] rounded-md border">
                                        {tasks.map((task) => (
                                            <section className="p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                                                <div className="font-semibold p-1">{task.titleTask}</div>
                                                <div className="pl-2 pb-1 underline">{task.priorityTask}</div>
                                                <div className="pl-2 text-[#777777]">{task.descriptionTask}</div>
                                            </section>

                                        ))}
                                    </ScrollArea>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
                <section className="">
                    <div className="grid mt-[8.313rem] justify-items-center">
                        <Card className="grid justify-items-center w-[19rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                            <div className="p-5">
                                <label>Prioridade</label>
                                <Tabs id="priorityTask" defaultValue="Baixa" className="mt-2">
                                    <TabsList className="grid w-[16.875rem] grid-cols-3">
                                        <TabsTrigger onClick={() => setPriority("Baixa")} value="Baixa">Baixa</TabsTrigger>
                                        <TabsTrigger onClick={() => setPriority("Média")} value="Média">Média</TabsTrigger>
                                        <TabsTrigger onClick={() => setPriority("Alta")} value="Alta">Alta</TabsTrigger>
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
                                <Button type="button"
                                    onClick={() => addTask()}
                                    className="w-29 h-10 rounded-xl text-sm text-black bg-white shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.25)] hover:bg-[#C0C0C0] hover:duration-150 dark:bg-[#37373F] dark:text-white dark:hover:bg-[#C0C0C0] dark:hover:duration-150"
                                >Adicionar Tarefa</Button>
                            </div>
                        </Card>
                    </div>
                    <div className="ml-52 mt-20">
                        <Button type="submit"
                            className="w-40 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-sky-600">Criar Processo</Button>
                    </div>
                </section>
            </form>
        </main>

    )
}