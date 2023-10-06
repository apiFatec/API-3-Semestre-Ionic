import { useEffect, useState } from 'react';
import { ProcessCard } from "@/components/processCard";
import { useTheme } from "@/components/theme.provider"
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import processService from '@/services/processService';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';

export interface Process {
  process_id: string;
  process_name: string;
  process_description: string;
  process_deadline: string;
  process_status: string;
  users: Array<Users>;
}

interface Users {
  name: string;
  role: string;
  id: string;
}

export function Home() {
  const { theme } = useTheme();
  const [processes, setProcesses] = useState<Process[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProcesses();
  }, [])

  async function getProcesses() {
    processService.getAll()
      .then((response) => {
        setProcesses(response.data);
        console.log(processes);
      }).catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="flex flex-col px-10 gap-10">
      <div className="flex items-center">
        <div className="flex flex-col gap-3 w-1/2">
          <img src={`./ionic-text-${theme}.svg`} className="w-1/2" alt="logo contendo nome da marca ionichealth" />
          <h1 className="text-theme-smooth">Acompanhamento de processos</h1>
        </div>

        <div className="flex w-1/2 items-center justify-end gap-4">
          <Button className="bg-button hover:bg-ionic-pressed" onClick={() => navigate('/criar-processo')}>
            Novo Processo
          </Button>

          <form className={cn("p-2 rounded-md flex gap-6 shadow-md  border-[1px]", theme === 'light' ? 'bg-white' : 'bg-background-secondary')}>
            <input
              type="text"
              placeholder="Pesquisar processo"
              className="outline-none  bg-transparent"
            />
            <Button className='bg-transparent hover:bg-transparent w-fit h-6'>
              <Search className="text-primary/60" />
            </Button>
          </form>
        </div>
      </div>
      {processes.length === 0 &&
        <p className='w-full p-3 text-center text-2xl border-b-2 font-semibold'>Nenhum Processo Criado</p>
      }
      <div className="grid grid-cols-3 w-full justify-between gap-10">
        <div className="grid w-full gap-3 max-h-[580px] overflow-auto">
          <p>Backlog</p>
          <div>
            {processes.map((process) => {
              if (process.process_status === "Aguardando") {
                return (
                  <ProcessCard key={process.process_id}
                    process_id={process.process_id}
                    process_description={process.process_description}
                    process_name={process.process_name}
                    users={process.users}
                    process_progress={50}
                  />
                )
              }
            })}
          </div>

        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px] overflow-auto">
          <p>Em progresso</p>
          {processes.map((process) => {
            if (process.process_status === "Em progresso") {
              return (
                <ProcessCard key={process.process_id}
                  process_id={process.process_id}
                  process_description={process.process_description}
                  process_name={process.process_name}
                  users={process.users}
                  process_progress={50}
                />
              )
            }
          })}
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]  overflow-auto">
          <p>Finalizado</p>
          {processes.map((process) => {
            if (process.process_status === "Finalizado") {
              return (
                <ProcessCard key={process.process_id}
                  process_id={process.process_id}
                  process_description={process.process_description}
                  process_name={process.process_name}
                  users={process.users}
                  process_progress={50}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}