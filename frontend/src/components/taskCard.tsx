import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Text } from "lucide-react"
import { Task as TaskInterface } from '@/pages/process/process';

interface Props {
  showModal: () => void;
  task: TaskInterface;
}

export function Task({ showModal, task }: Props) {
  return (
    <Card className="w-full p-3 cursor-pointer shadow-md" onClick={showModal}>
      <CardHeader className="p-0">
        <CardTitle className="text-lg">{task?.title}</CardTitle>
        <CardDescription className="mt-0 truncate w-72">{task?.description}</CardDescription>
      </CardHeader>

      <CardFooter className="w-full flex justify-between p-0 items-center mt-3 relative">
        {task?.description &&
          <Text />
        }
        {/* <div className="h-8 w-[100px] absolute right-0 flex items-center">
          <div className="w-7 h-7 rounded-full overflow-hidden absolute top-0">
            <img className="w-full h-full" src={photo} alt="caralho" />
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden absolute top-0 left-[22%]">
            <img className="w-full h-full" src={photo} alt="caralho" />
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden absolute top-0 left-[42%]">
            <img className="w-full h-full" src={photo} alt="caralho" />
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden absolute top-0 left-[62%] bg-white border-2 flex items-center justify-center text-center text-sm font-semibold">
            +2
          </div>
        </div> */}
      </CardFooter>
    </Card>
  )
}
