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
import { Value } from "@radix-ui/react-select";
import { useState } from "react";

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
  processes: Process[]
}

export function TeamModal({ closeModal, processes }: TeamModal) {
  const [processSelected, setProcessSelected] = useState<number>(0);

  function handleProcesSelect(value: string) {
    const { process, index } = JSON.parse(value);
    setProcessSelected(index);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={closeModal}>
      {/* Fundo escuro */}
      <div className="bg-black opacity-50 inset-0 absolute"></div>

      {/* Conteúdo do modal */}
      <div className="bg-white z-10 px-8 py-6 rounded-lg flex flex-col w-1/2 ml-[20%] max-h-[600px]" onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex justify-between items-center mb-5">
          <div className="flex flex-col justify-start">
            <h1 className="text-xl">Talison Cardoso</h1>
            <p className="text-sm text-gray-700">Gestora de processos</p>
          </div>
          <button onClick={closeModal} className="w-12 h-12 flex flex-col items-center justify-center">
            <X size={21} color="black" />
          </button>
        </div>

        <form className="flex justify-center items-start w-full gap-8">
          <div className="flex flex-col w-full gap-5 ">
            <label htmlFor="title" className="flex flex-col justify-start items-start gap-1">
              Titulo do documento
              <input
                className="h-10 outline-none py-1 px-2 border-gray-400 border-[1px] rounded-md w-full"
                type="text"
                name="title"
                id="title"
              />
            </label>
            <label htmlFor="descricao" className="flex flex-col justify-start items-start gap-1">
              Descrição
              <textarea
                className="outline-none py-1 px-2 border-gray-400 border-[1px] rounded-md w-full resize-none h-44"
                name="descricao"
                id="descricao"
              />
            </label>
          </div>

          <div className="flex flex-col w-full gap-5 justify-start items-start">
            <label htmlFor="title" className="flex flex-col justify-start items-start gap-1 w-full">
              Processo
              <Select onValueChange={(value) => handleProcesSelect(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um processo" />
                </SelectTrigger>
                <SelectContent>
                  {processes.map((process, index) => (
                    <SelectItem
                      key={process.id}
                      value={JSON.stringify({ process: process.id, index: index })}
                    >
                      {process.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label htmlFor="title" className="flex flex-col justify-start items-start gap-1 w-full mb-20">
              Tarefa
              <Select disabled={!processSelected}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {processes[processSelected].tasks.map((task) => (
                    <SelectItem value={task.id}>{task.title}</SelectItem>
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

              <Button type="button">
                Enviar
              </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}