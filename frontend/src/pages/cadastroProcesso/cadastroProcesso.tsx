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

interface ProcessFormValues {
    title: string;
    description: string;
    deadline: Date;
    teamLeader: string;
    team: string;
    tasks: Array<Tasks>;
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

    const createProcess: SubmitHandler<ProcessFormValues> = (data) => {
        console.log(data)
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
                                    register={register}
                                    name="title"
                                />
                                <TextArea
                                    label="Descrição"
                                    id="description"
                                    register={register}
                                    name="description"
                                />
                            </div>
                            <div className="ml-2">
                                <SelectForm
                                    label="Líder responsável do processo"
                                    id="lider"
                                    register={register}
                                    name="teamLeader"
                                />

                                <SelectForm
                                    label="Atribuir uma equipe"
                                    id="team"
                                    register={register}
                                    name="team"
                                />
                                <Input
                                    label="Tempo de duração"
                                    id="deadline"
                                    type="date"
                                    register={register}
                                    name="deadline"
                                />

                                <div className="center-normal py-2">
                                    <label>Tarefas</label>
                                    <ScrollArea id="listTasks" className="mt-2 p-4 h-44 w-[16.875rem] rounded-md border"></ScrollArea>
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
                                register={undefined} name={null}
                            />
                            <TextArea
                                label="Descrição"
                                id="descriptionTask"
                                setValue={setDescriptionTask} 
                                register={undefined} name={null}
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
                        <Button type="submit" className="w-40 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-sky-600">Criar Processo</Button>
                    </div>
                </section>
            </form>
        </main>

    )
}