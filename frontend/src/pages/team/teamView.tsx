import { CardTeamView } from "@/components/cardTeamView";
import { Process, TeamModal } from "@/components/teamModal";
import { Button } from "@/components/ui/button";
import { Processes } from "@/interfaces/processes";
import { Teams } from "@/interfaces/teams";
import processService from "@/services/processService";
import teamsService from "@/services/teamsService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function TeamView() {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Teams>();
  const [processes, setProcesses] = useState<Process[]>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getTeam(id);
  }, []);

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

  async function showModalTeam() {
    setShowModal(!showModal);
  }

  return (
    <div>
      <div className="flex items-center justify-between px-14 py-3">
        <div>
          <h1>Time</h1>
          <p>Processos</p>
        </div>

        <Button
          className="bg-button hover:bg-ionic-pressed"
          onClick={() => navigate("/criar-processo")}
        >
          Editar equipe
        </Button>
      </div>
      <div className="w-full flex flex-col px-11 gap-6 max-h-[600px] overflow-auto">
        {team?.users.map((user) => (
          <CardTeamView toggleModal={showModalTeam} fallbackName={fallbackName(user.name)} {...user} key={user.id} />
        ))}
      </div>
      {showModal &&
        <TeamModal
          closeModal={showModalTeam}
          processes={processes!}
        />
      }
    </div>
  )
}