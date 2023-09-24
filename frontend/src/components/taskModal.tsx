import { ArrowLeftFromLine, CheckSquare, ClipboardList, Text, User } from "lucide-react";
import photo from '../../public/lula.jpg';
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Task } from "@/pages/process/process";
import userServices from "@/services/userServices";

interface Modal {
  id: string | undefined;
  title: string | undefined;
  members: string | undefined;
  description: string | undefined;
  priority: string | undefined;
  task?: Task
  toggleModal: (task: Task) => void;
  closeModal: () => void;
}

export function TaskModal({ task, id, title, members, description, priority, toggleModal, closeModal }: Modal) {

  const priorityColor = () => {
    if (priority === "Baixa") {
      return "bg-blue-300/30 text-blue-900"
    } else if (priority === "Média") {
      return "bg-orange-300/30 text-orange-900"
    } else {
      return "bg-red-300/30 text-red-900"
    }
  }

  async function joinTask() {
    userServices.joinTask({
      task: task,
      user: localStorage.getItem('token')
    })
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={closeModal}>
      {/* Fundo escuro */}
      <div className="bg-black opacity-50 inset-0 absolute"></div>

      {/* Conteúdo do modal */}
      <div className="bg-white z-10 p-4 rounded-lg flex w-1/2 ml-[20%] max-h-[600px]" onClick={(e) => e.stopPropagation()}>
        <section className="w-3/4">
          <header className="flex items-center gap-3 mb-8">
            <ClipboardList />
            <h2 className="text-2xl font-bold">{title}</h2>
          </header>

          <div className="flex flex-col ml-10 mb-5">
            <p>Membros</p>
            <div className="flex gap-2 items-center">
              <div className="flex w-8 h-8 rounded-full overflow-hidden">
                <img src={photo} alt="caralho" />
              </div>
              <div className="flex w-8 h-8 rounded-full overflow-hidden">
                <img src={photo} alt="caralho" />
              </div>
              <div className="flex w-8 h-8 rounded-full overflow-hidden">
                <img src={photo} alt="caralho" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Text />
              <p className="font-semibold">Descrição</p>
            </div>
            <div className="ml-10 pr-4 max-h-96 overflow-auto">
              <p className="">
                {description}
              </p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col px-3 w-1/3">
          <div className={cn("py-1 px-2 font-bold text-center rounded-full mb-6", priorityColor())}>
            {priority}
          </div>

          <div>
            <p>Entrar</p>
            <Button
              onClick={() => joinTask()}
              className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-3">
              <User size={18} />
              Ingressar
            </Button>

            <p>Ações</p>
            <Button className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2">
              <CheckSquare size={18} />
              Concluir
            </Button>
            <Button className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2">
              <ArrowLeftFromLine size={18} />
              Sair
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}