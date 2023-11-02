import { useContext, useEffect, useState } from "react";
import { ProcessCard } from "@/components/processCard";
import { useTheme } from "@/components/theme.provider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import processService from "@/services/processService";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { Process } from "@/interfaces/process";
import { TitleContext } from "@/contexts/TitleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {handleTitle} = useContext(TitleContext);
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    getProcesses();
  }, []);

  async function getProcesses() {
    processService
      .getAll()
      .then((response) => {
        setProcesses(response.data);
        handleTitle("Acompanhamento de Processos");
      }).catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col px-10 gap-10">
      <div className="flex items-center">
        <div className="flex flex-col gap-3 w-1/2">
          <img
            src={`./ionic-text-${theme}.svg`}
            className="w-1/2"
            alt="logo contendo nome da marca ionichealth"
          />
          
        </div>

        <div className="flex w-1/2 items-center justify-end gap-4">
          <Button
            className="bg-button hover:bg-ionic-pressed"
            onClick={() => navigate("/criar-processo")}
          >
            Novo Processo
          </Button>

          <form
            className={cn(
              "p-2 rounded-md flex gap-6 shadow-md  border-[1px]",
              theme === "light" ? "bg-white" : "bg-background-secondary"
            )}
          >
            <input
              type="text"
              placeholder="Pesquisar processo"
              className="outline-none  bg-transparent"
            />
            <Button className="bg-transparent hover:bg-transparent w-fit h-6">
              <Search className="text-primary/60" />
            </Button>
          </form>
        </div>
      </div>
      {processes.length === 0 && (
        <p className="w-full p-3 text-center text-2xl border-b-2 font-semibold">
          Nenhum Processo Criado
        </p>
      )}
      <div className="grid grid-cols-3 w-full justify-between gap-10">
        {processes.map((process) => {
          const totalTasks = process.tasks ? process.tasks.length : 0;
          const tasksInProgress = process.tasks ? process.tasks.filter((task) => task.status === "Em progresso").length : 0;
          const finishedTasks = process.tasks ? process.tasks.filter((task) => task.status === "Finalizado").length : 0;
          if (totalTasks == finishedTasks){
            process.process_status = "Finalizado"
          }
          else if (finishedTasks == 0 && tasksInProgress == 0){
            process.process_status = "Aguardando"
          } else {
            process.process_status = "Em progresso"
          }
          return null
        })}
        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Backlog</p>
          <ScrollArea className="h-full w-[20rem]">
            {processes.map((process) => {
              if (process.process_status === "Aguardando") {
                return (
                  <ProcessCard
                    key={process.process_id}
                    processId={process.process_id}
                    processDescription={process.process_description}
                    processName={process.process_name}
                    users={process.users}
                    processDeadline={process.process_deadline}
                    processStatus={process.process_status}
                    tasks={process.tasks} />
                );
              }
            })}
          </ScrollArea>
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Em progresso</p>
          <ScrollArea className="h-full w-[20rem]">
            {processes.map((process) => {
              if (process.process_status === "Em progresso") {
                return (
                  <ProcessCard
                    key={process.process_id}
                    processId={process.process_id}
                    processDescription={process.process_description}
                    processName={process.process_name}
                    users={process.users}
                    processDeadline={process.process_deadline}
                    processStatus={process.process_status}
                    tasks={process.tasks} />
                );
              }
            })}
          </ScrollArea>
        </div>

        <div className="flex flex-col w-full gap-3 max-h-[580px]">
          <p>Finalizado</p>
          <ScrollArea className="h-full w-[20rem]">
            {processes.map((process) => {
              if (process.process_status === "Finalizado") {
                return (
                  <ProcessCard
                    key={process.process_id}
                    processId={process.process_id}
                    processDescription={process.process_description}
                    processName={process.process_name}
                    users={process.users}
                    processDeadline={process.process_deadline}
                    processStatus={process.process_status}
                    tasks={process.tasks} />
                );
              }
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
