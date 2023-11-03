import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import { Teams } from "@/interfaces/teams";
import { Tasks } from "@/interfaces/tasks";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import emailService from "@/services/emailService";
import { useToast } from "./ui/use-toast";

export interface Process {
  id: string;
  name: string;
  description: string;
  deadline: string;
  tasks: Tasks[];
  team: Teams;
}

interface TeamModal {
  closeModal: any
  processes: Process[],
  username: string | undefined;
  role: string | undefined;
  email: string | undefined
}

interface FormValues {
  email: string;
  title: string;
  description: string;
  process: string;
  processId: string;
  task: string;
}

export function TeamModal({ closeModal, processes, username, role, email }: TeamModal) {
  const [processSelected, setProcessSelected] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [task, setTask] = useState<Tasks>()
  const [process, setProcess] = useState<Process>()
  const { handleSubmit, register } = useForm<FormValues>();
  const { toast } = useToast();

  function handleProcesSelect(value: string) {
    const { process, index } = JSON.parse(value);
    setDisabled(false);
    setProcessSelected(index);
    setProcess(process);
  }

  function handleTaskSelect(value: string) {
    const task = JSON.parse(value);
    setTask(task)
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.processId = process!.id;
    data.process = process!.name;
    data.task = task!.id!;
    data.email = email!;

    emailService.attachmentRequest(data)
      .then((response) => {
        toast({
          title: "Email Enviado com Sucesso",
          description: `O seu email de solicitação  de anexo de arquivo para a tarefa "${task!.title}" foi enviado com sucesso. Obrigado por sua colaboração!`,
          variant: "default"
        });
        closeModal();
      }).catch((err) => {
        console.log(err);
        toast({
          title: "Erro ao enviar o Email",
          description: `ERRO: ${err.message}`,
          variant: "destructive"
        })
      })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={closeModal}>
      {/* Fundo escuro */}
      <div className="bg-black opacity-50 inset-0 absolute"></div>

      {/* Conteúdo do modal */}
      <div className="bg-white z-10 px-8 py-6 rounded-lg flex flex-col w-1/2 ml-[20%] max-h-[600px]" onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex justify-between items-center mb-5">
          <div className="flex flex-col justify-start">
            <h1 className="text-xl">{username}</h1>
            <p className="text-sm text-gray-700">{role} de processos</p>
          </div>
          <button onClick={closeModal} className="w-12 h-12 flex flex-col items-center justify-center">
            <X size={21} color="black" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-start w-full gap-8">
          <div className="flex flex-col w-full gap-5 ">
            <label htmlFor="title" className="flex flex-col justify-start items-start gap-1">
              Titulo da solicitação
              <input
                className="h-10 outline-none py-1 px-2 border-gray-400 border-[1px] rounded-md w-full"
                type="text"
                id="title"
                {...register('title')}
              />
            </label>
            <label htmlFor="descricao" className="flex flex-col justify-start items-start gap-1">
              Descrição
              <textarea
                className="outline-none py-1 px-2 border-gray-400 border-[1px] rounded-md w-full resize-none h-44"
                id="descricao"
                {...register('description')}
              />
            </label>
          </div>

          <div className="flex flex-col w-full gap-5 justify-start items-start">
            <label htmlFor="title" className="flex flex-col justify-start items-start gap-1 w-full">
              Processo
              <Select
                {...register('processId')}
                onValueChange={(value) => handleProcesSelect(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um processo" />
                </SelectTrigger>
                <SelectContent>
                  {processes.map((process, index) => (
                    <SelectItem
                      key={process.id}
                      value={JSON.stringify({ process: process, index: index })}
                    >
                      {process.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label htmlFor="title" className="flex flex-col justify-start items-start gap-1 w-full mb-20">
              Tarefa
              <Select disabled={disabled}
                onValueChange={(value) => handleTaskSelect(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {processes[processSelected ? processSelected : 0]?.tasks.map((task) => (
                    <SelectItem key={task.id} value={JSON.stringify(task)}>{task.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <div className="self-end">
              <Button
                type="button"
                className="bg-transparent text-primary hover:bg-transparent"
                onClick={closeModal}
              >
                Cancelar
              </Button>

              <Button>
                Enviar
              </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}