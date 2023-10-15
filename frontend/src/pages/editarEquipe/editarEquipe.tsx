import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import UserServices from "@/services/userServices";
import { Teams } from "@/interfaces/teams";
import { useParams } from "react-router-dom";

export function EditarEquipe() {
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState<Teams>();

  useEffect(() => {
    async function getTeam() {
      try {
        const response = await UserServices.getTeamMembers("teamId");
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Erro ao buscar os membros do time:", error);
      }
    }

    getTeam();
  }, []);

  const middleIndex = Math.ceil(teamMembers.length / 2);
  const leftColumn = teamMembers.slice(0, middleIndex);
  const rightColumn = teamMembers.slice(middleIndex);

  return (
    <section className="grid grid-cols-2 border p-4 rounded-lg m-auto w-fit gap-4">
      <div className="mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3>Nome da equipe</h3>
          <input
            type="text"
            name="time"
            id="time"
            placeholder="Time de processos"
            className="p-2 pr-6 border rounded"
          />
        </div>
        <div className="flex gap-4 items-center">
          <h3>Colaboradores</h3>
          <Button
            variant={"outline"}
            className="text-gray-300 font-thin text-center "
          >
            Adicionar colaborador
          </Button>
        </div>
        {leftColumn?.map((member) => {
          return (
            <div key={member.id} className="flex gap-4 p-4 border rounded-sm">
              <img src="/" alt="img" className="rounded-full" />
              <div>
                <p>{member.name}</p>
                <p className="text-xs text-gray-500	">{member.function}</p>
              </div>
              <a href="/" className="ml-12 text-zinc-700 text-sm  ">
                Editar
              </a>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3>Gestor da equipe</h3>
          <input
            type="text"
            name="gestor"
            id="gestor"
            placeholder="Roberta Diaz"
            className="p-2 pr-6 border rounded"
          />
        </div>
        <div></div>
        {rightColumn?.map((member) => {
          return (
            <div key={member.id} className="flex gap-4 p-4 border rounded-sm">
              <img src="/" alt="img" className="rounded-full" />
              <div>
                <p>{member.name}</p>
                <p className="text-xs text-gray-500	">{member.function}</p>
              </div>
              <a href="/" className="ml-12 text-zinc-700 text-sm  ">
                Editar
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
