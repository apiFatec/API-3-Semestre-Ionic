import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useTheme } from "./theme.provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export interface Process {
  process_name: string;
  process_description: string;
  users: Array<Users>;
  process_id: string;
  // process_progress: number;
  tasks: Array<Tasks>;
}

interface Users {
  name: string;
  role: string;
  id: string;
}

interface Tasks {
  id: string;
  status: string;
}

export function ProcessCard(process: Process, { tasks }: { tasks?: Tasks[] }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [percentual, setPercentual] = useState(50);

  useEffect(() => {
    porcentagem();
  })

  function nav() {
    navigate(`/processos/${encodeURIComponent(process.process_name)}/${process.process_id}`);
  }

  function porcentagem() {
    const lenTasks = tasks?.length || 0
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
    console.log(porcentagem)
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
        <Progress value={percentual} />
      </div>

      <div className="flex w-56 truncate gap-2">
        {process.users.map((user) => { return (<span key={user.id}>{user.name}</span>) })}
      </div>
    </Card>
  )
} 