import { CardTeamView } from "@/components/cardTeamView";
import { Process, TeamModal } from "@/components/teamModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TitleContext } from "@/contexts/TitleContext";
import { UserContext } from "@/contexts/userContext";
import { Processes } from "@/interfaces/processes";
import { Teams } from "@/interfaces/teams";
import { Users } from "@/interfaces/users";
import processService from "@/services/processService";
import teamsService from "@/services/teamsService";
import userServices from "@/services/userServices";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export function TeamView() {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const { handleTitle } = useContext(TitleContext);
  const { toast } = useToast();
  const { user } = useContext(UserContext);
  const [team, setTeam] = useState<Teams>();
  const [processes, setProcesses] = useState<Process[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Users>()
  const [removingUser, setRemovingUser] = useState<boolean>(true);

  useEffect(() => {
    getTeam(id);
    handleTitle("Meu time");
  }, [removingUser]);

  async function getTeam(id: string) {
    teamsService.getOne(id)
      .then((response) => {
        setTeam(response.data);
        getProcesses(id)
      }).catch((err) => {
        console.log(err);
      })
  }

  async function getProcesses(id: string) {
    processService.getAllToTeam(id)
      .then((response) => {
        setProcesses(response.data);
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  function fallbackName(name: string) {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
    } else {
      return names[0][0].toUpperCase();
    }
  }

  async function showModalTeam(user: any) {
    setShowModal(!showModal);
    setSelectedUser(user);
  }

  async function removeFromTeam(user: Users) {
    userServices.removeFromTeam(user.id)
      .then((response) => {
        setRemovingUser(!removingUser);
        toast({
          title: "Colaborador removido da equipe com sucesso",
          description: `Colaborador ${user.name} foi removido da equipe`,
          variant: "default"
        });
      }).catch((err) => {
        console.log(err);
        toast({
          title: "Erro ao remover colaborador",
          description: `ERRO: ${err.response.data.message}`,
          variant: "destructive"
        })
      })
  }

  if (!team) {
    return (
      <div className="flex flex-col w-full gap-2 px-12 py-5 border-t-2 border-black/20">
        <h1 className="text-2xl font-semibold">Você ainda não faz parte de nenhum time</h1>
        <p>Entre em contato com seu gestor</p>
      </div>
    )
  }

  return (

    <div>
      <div className="flex items-center justify-between px-12 py-3">
        <div>
          <h1>Time</h1>
          <p>{team?.name}</p>
        </div>
        {user.role !== "Desenvolvedor" &&
          <Link to={`/editar-equipe/${team.id}`}>
            <Button
              className="bg-button hover:bg-ionic-pressed"
              onClick={() => navigate("/criar-processo")}
            >
              Editar equipe
            </Button>
          </Link>
        }
      </div>
      <div className="w-full flex flex-col px-11 gap-6 max-h-[600px] overflow-auto">
        {team?.users.map((user) => (
          <CardTeamView
            leader={user.id === team.leader.id}
            toggleModal={() => showModalTeam(user)}
            fallbackName={fallbackName(user.name)}
            {...user}
            key={user.id}
            removeFromTeam={() => removeFromTeam(user)}
          />
        ))}
      </div>
      {showModal &&
        <TeamModal
          username={selectedUser?.name}
          role={selectedUser?.role}
          email={selectedUser?.email}
          closeModal={showModalTeam}
          processes={processes!}
        />
      }
    </div>
  )
}