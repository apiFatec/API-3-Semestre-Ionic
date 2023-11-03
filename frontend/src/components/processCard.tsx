import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useTheme } from "./theme.provider";
import { useNavigate } from "react-router-dom";
import { PhotoProfile } from "./photoProfile";
import { Badge } from "./ui/badge";
import { Users } from "@/interfaces/users";
import { Avatar, AvatarFallback } from "./ui/avatar";


export interface Process {
  processId: string;
  processName: string;
  processDescription: string;
  processDeadline: Date;
  processStatus: string;
  users: Array<Users>;
  tasks: Array<Task>;
}

// interface Users {
//   name: string;
//   role: string;
//   id: string;
//   // url_photo: string;
// }

interface Task {
  status: string;
}

export function ProcessCard(process: Process) {
  const { theme } = useTheme();
  const currentDate = formatDate(process.processDeadline);
  const navigate = useNavigate();


  function formatDate(date: Date) {
    const deadline = new Date(date);
    const day = deadline.toLocaleString('default', { day: '2-digit' });
    const month = deadline.toLocaleString('default', { month: 'short' });
    const year = deadline.toLocaleString('default', { year: 'numeric' });
    return day + ' ' + month[0].toUpperCase() + month.substring(1) + ' ' + year;
  }

  function nav() {
    navigate(`/processos/${encodeURIComponent(process.processName)}/${process.processId}`);
  }

  const totalTasks = process.tasks ? process.tasks.length : 0;

  const finishedTasks = process.tasks ? process.tasks.filter((task) => task.status === "Finalizado").length : 0;

  const percentage = totalTasks > 0 ? (finishedTasks / totalTasks) * 100 : 0;

  let contUsers = 0;

  return (
    <Card onClick={() => nav()}
      className={
        cn("grid w-[19rem] p-3 mb-3 justify-items-start cursor-pointer", theme === 'light' ? 'bg-white' : 'bg-background-secondary')
      }>
      <div className="flex w-full mb-2">
        <p className="text-sm text-orange-600">{process.processName}</p>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 w-full line-clamp-1">{process.processDescription}</p>
      </div>

      {process.processStatus == "Em progresso" && (
        <div className="w-[17.3rem]">

          <p className="flex justify-end text-xs text-[#949494]">{finishedTasks}/{totalTasks} tarefas</p>
          <Progress className="h-2 bg-gray-200" value={percentage} />
        </div>
      )}

      <div className="grid grid-cols-2 w-full">
        <div className="w-full flex items-end">
          <Badge className="]" variant={"secondary"}>{currentDate}</Badge>
        </div>
        <div className="flex flex-row-reverse pt-4 items-center">
          {
            process.users.slice(2, process.users.length).map(() => {
              contUsers = contUsers + 1
              return null
            })}
          {contUsers > 0 && (
            <Avatar className="h-11 w-11 shadow-md border-black/20 border-[1px]">
              <AvatarFallback>+{contUsers}</AvatarFallback>
            </Avatar>
          )
          }
          {process.users.slice(0, 2).map((user, index) => {
            return (
              <span className="mx-[-4px]" key={index}><PhotoProfile url={user.profileImage} /></span>
            )
          })}
        </div>
      </div>

    </Card>
  )
} 