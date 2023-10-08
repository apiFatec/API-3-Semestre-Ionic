import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useTheme } from "./theme.provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PhotoProfile } from "./photoProfile";
import { Badge } from "./ui/badge";


export interface Process {
  process_id: string;
  process_name: string;
  process_description: string;
  process_deadline: string;
  process_status: string;
  users: Array<Users>;
  tasks: Array<Task>;
}

interface Users {
  name: string;
  role: string;
  id: string;
  url_photo: string;
}

interface Task {
  status: string;
}

export function ProcessCard(process: Process, { tasks }: { tasks?: Task[] }) {
  const { theme } = useTheme();
  const currentDate = formatDate(new Date(process.process_deadline));
  const navigate = useNavigate();
  const [percentual, setPercentual] = useState(50);


  useEffect(() => {
    porcentagem();
  }, [])

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  function nav() {
    navigate(`/processos/${encodeURIComponent(process.process_name)}/${process.process_id}`);
  }

  function porcentagem() {
    const lenTasks = tasks?.length || 0;
    const finishedTasks = tasks?.reduce((result, task) => {
      if (task.status === "Finalizado") {
        return result + 1;
      }
      return result;
    }, 0);
    if (lenTasks === 0) {
      return 0;
    }
    const porcentagem = (finishedTasks || 0) / lenTasks * 100;
    setPercentual(porcentagem);
  }

  return (
    <Card onClick={() => nav()}
      className={
        cn("grid w-88 p-3 mb-3 justify-items-start cursor-pointer", theme === 'light' ? 'bg-white' : 'bg-background-secondary')
      }>
      <div className="flex w-full mb-2">
        <p className="text-sm text-orange-600">{process.process_name}</p>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 w-80 truncate">{process.process_description}</p>
      </div>

      <div className="w-[17.3rem]">
        <Progress className="h-[0.65rem]" value={percentual} />
      </div>

      <div className="grid grid-cols-2 w-full">
        <div className="w-[50%] flex items-end">
          <Badge className="" variant={"secondary"}>{currentDate}</Badge>
        </div>
        <div className="flex flex-row-reverse gap-5 py-4 mb-3 w-[50%]">
          {process.users.map((user) => {
            return (
              <span className="" key={user.id}><PhotoProfile /></span>
            )
          })}
        </div>
      </div>

    </Card>
  )
} 