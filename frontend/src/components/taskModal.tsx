import {
  ArrowLeftFromLine,
  CheckSquare,
  ClipboardList,
  Text,
  User,
  Paperclip,
  Users,
} from "lucide-react";
import photo from "../../public/lula.jpg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Tasks } from "@/interfaces/tasks";
import userServices from "@/services/userServices";
import { TaskFileModal } from "./taskFileModal";
import { useEffect, useState } from "react";
import taskService from "@/services/taskService";
import FileList from "./fileList";

export interface getFiles {
  fileName: string;
  contentLength: number;
  contentType: string;
  url: string;
  id: string;
  taskIdId: string | undefined;
  usersIdId: string | undefined;
}

interface userLog {
  id: string;
  name: string;
}

interface usersTask {
  id: string;
  users_id: string;
  tasks_id: string;
}

interface Modal {
  id: string | undefined;
  title: string | undefined;
  members: string | undefined;
  description: string | undefined;
  priority: string | undefined;
  task?: Tasks;
  toggleModal: (task: Tasks) => void;
  closeModal: any;
  setReload: (state: boolean) => void;
  reload: boolean;
}

export function TaskModal({
  task,
  id,
  title,
  members,
  description,
  priority,
  toggleModal,
  closeModal,
  setReload,
  reload,
}: Modal) {
  const [modalFile, setModalFile] = useState<boolean>(false);
  const [userInTask, setUserInTask] = useState<usersTask[]>();
  const [files, setFiles] = useState<getFiles[]>([]);
  const [userLog, setUserLog] = useState<userLog>();

  const priorityColor = () => {
    if (priority === "Baixa") {
      return "bg-blue-300/30 text-blue-900";
    } else if (priority === "Média") {
      return "bg-orange-300/30 text-orange-900";
    } else {
      return "bg-red-300/30 text-red-900";
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  async function getUserTask() {
    const user = await userServices.getOneUser(localStorage.getItem("token"));
    const files = await taskService.getFileTask(id);
    const result = await taskService.getUserTask(
      id,
      localStorage.getItem("token")
    );
    console.log(result.data);
    console.log(user.data);
    setUserLog(user.data);
    setUserInTask(result.data);
    setFiles(files.data);
  }

  async function joinTask() {
    userServices
      .joinTask({
        task: task,
        user: localStorage.getItem("token"),
      })
      .then((response) => {
        console.log("join task: " + response.data);
        getUserTask();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function finishTask(id: string | undefined) {
    userServices
      .finishTask(id)
      .then((response) => {
        console.log("finalizado", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function leaveTask(
    idTask: string | undefined,
    tokenUser: string | null
  ) {
    userServices
      .leaveTask(idTask, tokenUser)
      .then((response) => {
        console.log("leave task: " + response.data);
        getUserTask();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      {/* Fundo escuro */}
      <div className="bg-black opacity-30 inset-0 absolute"></div>

      {/* Conteúdo do modal */}
      <div
        className="bg-white z-10 p-4 rounded-lg flex w-2/5 ml-[20%] min-h-[40rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-3/4">
          <header className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl ml-8 ">{title}</h2>
          </header>

          <div className="flex flex-col  mb-5">
            <div className="flex gap-5">
              <Users color="#2C2C2C" />
              <p>Membros</p>
            </div>
            <div className="flex gap-2 items-center ml-10">
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
              <Text color="#2C2C2C" />
              <p className="">Descrição</p>
            </div>
            <div className="ml-10 pr-4 max-h-96 overflow-auto">
              <p className="">{description}</p>
            </div>

            <FileList files={files} />
          </div>
        </section>

        <aside className="flex flex-col px-3 w-1/3">
          <h3 className=" mt-14 text-sm mb-3">Prioridade</h3>
          <div
            className={cn(
              "py-1 px-2 font-bold text-center rounded-xl mb-6 ",
              priorityColor()
            )}
          >
            {priority}
          </div>

          <div>
            {!userInTask?.find((obj) => obj.users_id == userLog?.id) && (
              <>
                <p>Entrar</p>
                <Button
                  onClick={() => joinTask()}
                  className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-3 hover:bg-[#CCCCCC]"
                >
                  <User size={18} />
                  Ingressar
                </Button>
              </>
            )}

            {userInTask?.find((obj) => obj.users_id == userLog?.id) && (
              <>
                <p className="text-sm mb-2">Ações</p>
                <Button
                  onClick={() => finishTask(id)}
                  className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2 hover:bg-[#CCCCCC]"
                >
                  <CheckSquare size={18} />
                  Finalizar
                </Button>

                <Button
                  onClick={() => setModalFile(!modalFile)}
                  className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2 hover:bg-[#CCCCCC]"
                >
                  <Paperclip size={18} />
                  Anexo
                </Button>

                <Button
                  onClick={() =>
                    leaveTask(task?.id, localStorage.getItem("token"))
                  }
                  className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2 hover:bg-[#CCCCCC]"
                >
                  <ArrowLeftFromLine size={18} />
                  Sair
                </Button>
              </>
            )}

            {modalFile && <TaskFileModal func={getUserTask} taskId={id} />}
          </div>
        </aside>
      </div>
    </div>
  );
}
