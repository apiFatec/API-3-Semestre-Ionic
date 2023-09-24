import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useTheme } from "./theme.provider";
import { useNavigate } from "react-router-dom";

export interface Process {
  process_name: string;
  process_description: string;
  users: Array<Users>,
  process_id: string;
}

interface Users {
  name: string;
  role: string;
  id: string;
}

export function ProcessCard(process: Process) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  function nav() {
    navigate(`/processos/${encodeURIComponent(process.process_name)}/${process.process_id}`);
  }

  return (
    <Card onClick={() => nav()}
      className={
        cn("p-3 flex flex-col items-center justify-center cursor-pointer", theme === 'light' ? 'bg-white' : 'bg-background-secondary')
      }>
      <div className="flex w-full mb-2">
        <p className="text-sm text-orange-600">{process.process_name}</p>
      </div>

      <div className="flex w-full flex-col">
        <p className="mb-2">{process.process_description}</p>
        <Progress value={33} />
      </div>

      <div className="flex w-full">
        {process.users.map((user) => { return (<span key={user.id}>{user.name}</span>) })}
      </div>
    </Card>
  )
} 