import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import UserServices from "@/services/userServices";
import { Teams } from "@/interfaces/teams";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TeamFormValues } from "@/interfaces/teamFormValues";
import userServices from "@/services/userServices";

export function EditarEquipe() {
  const { handleSubmit } = useForm<TeamFormValues>();
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState<Teams>();

  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState<TeamFormValues[]>([]);
  const [teamLeader, setTeamLeader] = useState("");
  const [users, setUsers] = useState<Users[]>([]);

  function redirectToAdicionarUsuario() {
    const navigate = useNavigate();
    navigate("/adicionar-usuario");
  }

  useEffect(() => {
    getTeam();
  }, []);

  async function getTeam() {
    try {
      const response = await UserServices.getTeamMembers("id");
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Erro ao buscar os membros do time:", error);
    }
  }

  const createTeam: SubmitHandler<TeamFormValues> = () => {
    const team: TeamFormValues = {
      name: teamName,
      users: users,
      leader: teamLeader,
    };
    userServices
      .createTeam(team)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="flex border p-4 rounded-lg m-auto w-[46rem] gap-4 flex-wrap">
      <form onSubmit={handleSubmit(createTeam)}>
        <div className="mt-4 flex gap-6 flex-wrap items-center mb-4">
          <div className="flex gap-2 items-center">
            <h3>Time</h3>
            <input
              type="text"
              id="teamName"
              placeholder={
                teamName ? `Nome do time: ${teamName}` : "Nome do time"
              }
              className="p-2 pr-6 border rounded"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <h3>Gestor da equipe</h3>
            <input
              type="text"
              id="teamLeader"
              placeholder={
                teamName
                  ? `Gestor da equipe: ${teamLeader}`
                  : "Gestor da equipe"
              }
              className="p-2 pr-6 border rounded"
              onChange={(e) => setTeamLeader(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <h3>Colaboradores</h3>
            <Button
              variant={"outline"}
              className="text-gray-300 font-thin text-center "
              onClick={redirectToAdicionarUsuario}
            >
              Adicionar colaborador
            </Button>
          </div>{" "}
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {users.map((member, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 border rounded-sm w-80 justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="rounded-full"
                />
                <div>
                  <p>{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <a href="/" className="text-zinc-700 text-sm ">
                Editar
              </a>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className="mt-4 w-32 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#4bacb4]"
        >
          Criar equipe
        </Button>
      </form>
    </section>
  );
}
