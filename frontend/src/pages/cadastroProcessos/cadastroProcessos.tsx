import { Input } from "@/components/InputForm";
import SelectForm from "@/components/select";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function CadastroProcessos() {
    return (
        <form className="grid grid-cols-2 gap-40 ml-12 content-evenly">
            <section className="">
                <h1 className="text-3xl mt-20">Novo Processo</h1>
                <div className="py-4">
                    <Card className="grid grid-cols-2 justify-items-center w-[37.5rem] p-[1.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                        <div className="mr-2">
                            <Input
                                label="Nome do processo"
                                id="name"
                                type="text"
                            />
                            <TextArea
                                label="Descrição"
                                id="description"
                            />
                        </div>
                        <div className="ml-2">
                            <SelectForm label="Líder responsável do processo" id="user_id" />

                            <SelectForm label="Atribuir uma equipe" id="team" />
                            <Input
                                label="Tempo de duração"
                                id="deadline"
                                type="date"
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
                <form className="grid grid-rows-2 mt-[8.313rem] justify-items-center">
                    <div className="">
                        <Card className="grid justify-items-center w-[19rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                            <div className="p-5">
                                <label>Prioridade</label>
                                <Tabs id="priority" defaultValue="Baixa" className="mt-2">
                                    <TabsList className="grid w-[16.875rem] grid-cols-3">
                                        <TabsTrigger value="Baixa">Baixa</TabsTrigger>
                                        <TabsTrigger value="Média">Média</TabsTrigger>
                                        <TabsTrigger value="Alta">Alta</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <Input
                                label="Título"
                                id="title"
                                type="text"
                            />
                            <TextArea
                                label="Descrição"
                                id="descriptionTask"
                            />
                            <div className="p-5">
                                <Button
                                    className="w-29 h-10 rounded-xl text-sm text-black bg-white shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.25)] hover:bg-[#C0C0C0] hover:duration-150 dark:bg-[#37373F] dark:text-white dark:hover:bg-[#C0C0C0] dark:hover:duration-150"
                                >Adicionar Tarefa</Button>
                            </div>
                        </Card>
                    </div>

                    <div className="ml-36 mt-20">
                        <Button type="submit" className="w-40 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] ">Criar Processo</Button>
                    </div>

                </form>
            </section>

        </form>
    )
}