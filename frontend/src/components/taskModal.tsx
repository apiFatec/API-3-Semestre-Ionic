import {
  ArrowLeftFromLine,
  CheckSquare,
  ClipboardList,
  Text,
  User,
  Paperclip,
  Users as UsersIcon,
} from "lucide-react";
import photo from "../../public/lula.jpg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Tasks } from "@/interfaces/tasks";
import userServices from "@/services/userServices";
import { TaskFileModal } from "./taskFileModal";
import { useContext, useEffect, useState } from "react";
import taskService from "@/services/taskService";
import FileList from "./fileList";
import { UserContext } from "@/contexts/userContext";
import { Users } from "@/interfaces/users";
import { Processes } from "@/interfaces/processes";
import { profile } from "console";

export interface getFiles {
  fileName: string;
  contentLength: number;
  contentType: string;
  url: string;
  id: string;
  taskIdId: string | undefined;
  usersIdId: string | undefined;
}

interface usersTask {
  id: string;
  users_id: string;
  tasks_id: string;
}

interface Modal {
  id: string | undefined;
  title: string | undefined;
  users: Users[] | undefined;
  description: string | undefined;
  priority: string | undefined;
  task?: Tasks;
  toggleModal?: (task: Tasks) => void;
  closeModal: any;
  process : Processes | undefined;
}

interface leader{
  email : string
}

interface Comentario {
  id : string
  comentario: string
  userId: string
  taskId: string
  name: string
  profileImage: string
}

export interface I2Comentario {
  comentario: string | undefined
  userId: string | undefined
  taskId: string | undefined
}

export function TaskModal({ task, id, title, users, description, priority, process, closeModal }: Modal) {
  const [comentarios, setComentarios] = useState<Comentario[]>()
  const [comentario, setComentario] = useState<string>()
  const [modalFile, setModalFile] = useState<boolean>(false);
  const [userInTask, setUserInTask] = useState<usersTask[]>();
  const [files, setFiles] = useState<getFiles[]>([]);
  const [userLog, setUserLog] = useState<Users>();
  const [leaderTeam, setLeaderTeam] = useState<leader[]>([]);
  const { id: idUser } = useContext(UserContext);
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
    console.log('getUsers')
    const user = await userServices.getOneUser(localStorage.getItem('id')!);
    const files = await taskService.getFileTask(id);
    const result = await taskService.getUserTask(id, localStorage.getItem('id'));
    const comentarios = await taskService.getComentarios(id)
    console.log(`id do processo: ${process?.id}`)
    const teamLeader = await taskService.leaderTeam(process?.id)
    setUserLog(user.data)
    setUserInTask(result.data);
    setFiles(files.data);
    setComentarios(comentarios.data)
    setLeaderTeam(teamLeader.data)
  }

  async function joinTask() {
    userServices.joinTask({
      task: task,
      user: localStorage.getItem('id')
    }).then((response) => {
      getUserTask();
      task!.status = 'Em progresso'
    })
      .catch((error) => {
        console.log(error);
      });
  }

  async function finishTask(id: string | undefined) {
    console.log('finishing')
    const mail = {
      email : leaderTeam[0].email,
      title : `Tarefa Finalizada`,
      description : `Tarefa "`+task?.title+`" finalizada com sucesso pelo usuário `+userLog?.name,
      process : process?.name,
      processId : process?.id
    }

    userServices.notificarGestor(mail)

    userServices.finishTask(id)
      .then(() => {
        getUserTask();
        window.location.reload()
      }).catch((error) => {
        console.log(error);
      });
  }

  async function reviewTask(id: string | undefined) {
    console.log('send tasks to review')
    userServices.reviewTask(id)
      .then((response) => {
        getUserTask();
        window.location.reload()
      }).catch((error) => {
        console.log(error);
      });
  }

  async function leaveTask(
    idTask: string | undefined,
    tokenUser: string | null
  ) {
    userServices.leaveTask(idTask, tokenUser)
      .then((response) => {
        getUserTask();
      })
      .catch((error) => {
        console.log(error); 
      });
  }

  async function Comentar() {
    if (comentario == '') {
      alert('campo de comentário está vazio')
    }
    else {const newComentario : I2Comentario = {
      comentario : comentario,
      taskId : id,
      userId : userLog?.id
    }

    await taskService.postComentario(newComentario)

    getUserTask()
    setComentario('')
  }
  }

  async function ExcluirComentario(id : string) {
    if (confirm('deseja excluir o comentário? ')){
      taskService.deleteComentario(id)
      getUserTask()
      setComentario('')
    }
  }

  async function sendEmail() {
    console.log(leaderTeam[0].email)
    console.log(task?.title)
  }

  console.log(comentarios)

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      {/* Fundo escuro */}
      <div className="bg-black opacity-30 inset-0 absolute"></div>

      {/* Conteúdo do modal */}
      <div
        className="bg-white z-10 p-4 rounded-lg flex w-3/5 ml-[20%] min-h-[40rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-3/4">
          <header className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl ml-8 ">{title}</h2>
          </header>

          <div className="flex flex-col  mb-5">
            <div className="flex gap-5">
              <UsersIcon color="#2C2C2C" />
              <p>Membros</p>
            </div>
            <div className="flex gap-2 items-center ml-10">
              {/* <div className="flex w-8 h-8 rounded-full overflow-hidden">
                <img src={photo} alt="caralho" />
              </div>
              <div className="flex w-8 h-8 rounded-full overflow-hidden">
                <img src={photo} alt="caralho" />
              </div> */}
              {users && (
                <>
                  {users.map(user => {
                    return (
                      <div className="flex w-8 h-8 rounded-full overflow-hidden">
                        <img src={user.profileImage} alt={user.name} />
                      </div>
                    )
                  })}
                </>
              )}
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

          <br />

          <p className="w-11/12 border-b flex flex-col gap-3">Comentários</p>

          <div className="flex items-center gap-4 mt-4">
            <img src={userLog?.profileImage} alt="img" className="flex w-8 h-8 rounded-full overflow-hidden" />
            <input
              onChange={(e) => setComentario(e.target.value)}
              value={comentario}
              type="text"
              placeholder="Adicionar comentário..."
              className="p-2 border-solid border w-9/12 rounded"
            />
            <button onClick={() => Comentar()}>Enviar</button>
          </div>
          <br />
          <div className="h-32 overflow-auto border-1 border-solid border-gray-300">
            {comentarios?.map((comentario) => {
              return (
                <div>
                    <div className="flex items-center gap-4 mt-4">
                      <img src={comentario.profileImage} alt="img" className="flex w-8 h-8 rounded-full overflow-hidden" />
                      <p
                        className="p-2 border-solid border w-9/12 rounded"
                      >{comentario.comentario}</p>
                      <button onClick={() => ExcluirComentario(comentario.id)} className="">Excluir</button>
                    </div>
                </div>
              )
            })}
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

                {task?.status === 'Finalizado' && (
                  <Button
                    className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2 hover:bg-[#CCCCCC]"
                    onClick={() => reviewTask(id)}
                  >
                    <ArrowLeftFromLine size={18} />
                    Voltar para progresso
                  </Button>
                )}

                <Button
                  className="flex items-center w-full justify-start rounded-none gap-2 bg-[#EBEBEB] py-0 px-2 text-slate-700 font-bold text-left mb-2 hover:bg-[#CCCCCC]"
                  onClick={() => leaveTask(task!.id, idUser)}
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
