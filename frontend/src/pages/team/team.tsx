import { CardTeamView } from "@/components/cardTeamView";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

export function Team() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="w-2/3 flex flex-col px-11 gap-6 max-h-[600px] overflow-auto">
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
        <CardTeamView />
      </div>
    </div>
  )
}