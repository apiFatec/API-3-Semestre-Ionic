import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useTheme } from "./theme.provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PhotoProfile } from "./photoProfile";
import { Badge } from "./ui/badge";


export interface Process {
  processId: string;
  processName: string;
  processDescription: string;
  processDeadline: string;
  processStatus: string;
  users: Array<Users>;
  tasks: Array<Task>;
}

interface Users {
  name: string;
  role: string;
  id: string;
  // url_photo: string;
}

interface Task {
  status: string;
}

export function ProcessCard(process: Process) {
  const { theme } = useTheme();
  const currentDate = formatDate(new Date(process.processDeadline));
  const navigate = useNavigate();


  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  console.log(currentDate)

  

  function nav() {
    navigate(`/processos/${encodeURIComponent(process.processName)}/${process.processId}`);
  }

  const totalTasks = process.tasks ? process.tasks.length : 0;

  const finishedTasks = process.tasks ? process.tasks.filter((task) => task.status === "Finalizado").length : 0;

  const percentage = totalTasks > 0 ? (finishedTasks / totalTasks) * 100 : 0;


  return (
    <Card onClick={() => nav()}
      className={
        cn("grid w-88 p-3 mb-3 justify-items-start cursor-pointer", theme === 'light' ? 'bg-white' : 'bg-background-secondary')
      }>
      <div className="flex w-full mb-2">
        <p className="text-sm text-orange-600">{process.processName}</p>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 w-80 truncate">{process.processDescription}</p>
      </div>

      <div className="w-[17.3rem]">
        <Progress className="h-[0.65rem]" value={percentage} />
      </div>

      <div className="grid grid-cols-2 w-full">
        <div className="w-[50%] flex items-end">
          <Badge className="" variant={"secondary"}>{currentDate}</Badge>
        </div>
        <div className="flex flex-row-reverse gap-5 py-4 mb-3 w-[50%]">
          {process.users.map((user, index) => {
            return (
              <span className="" key={index}><PhotoProfile /></span>
            )
          })}
        </div>
      </div>

    </Card>
  )
} 