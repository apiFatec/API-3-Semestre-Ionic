import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import UserServices from "@/services/userServices";
import { SubmitHandler, useForm } from "react-hook-form";
import { TeamFormValues } from "@/interfaces/teamFormValues";
import userServices from "@/services/userServices";
import { Users } from "@/interfaces/users";
import { TitleContext } from "@/contexts/TitleContext";
import teamsService from "@/services/teamsService";

export function EditarEquipe() {
  const { handleSubmit } = useForm<TeamFormValues>();
  const { handleTitle } = useContext(TitleContext);

  const [selectedMembers, setSelectedMembers] = useState<Users[]>([]);

  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    getTeam();
  }, []);

  function handleUsers(nUser: Users) {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.some((user) => user.id === nUser.id)) {
        return prevSelected.filter((user) => user.id !== nUser.id);
      } else {
        return [...prevSelected, nUser];
      }
    });
  }

  async function getTeam() {
    try {
      const response = await UserServices.getUser();
      setUsers(response.data);
      console.log(response);
      handleTitle("Criar equipe");
    } catch (error) {
      console.error("Erro ao buscar os membros do time:", error);
    }
  }

  const createTeam: SubmitHandler<TeamFormValues> = () => {
    const team: TeamFormValues = {
      name: teamName,
      users: selectedMembers,
      leader: teamLeader,
    };
    teamsService.createTeam(team)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="flex border p-4 rounded-lg m-auto w-[46rem] gap-4 flex-wrap ">
      <form
        onSubmit={handleSubmit(createTeam)}
        className="max-h-[40rem] overflow-auto"
      >
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
            <select
              id="teamLeader"
              className="p-2 pr-6 border rounded "
              value={teamLeader}
              onChange={(e) => setTeamLeader(e.target.value)}
            >
              <option value="">Gestor da Equipe</option>
              {users.map((user) => {
                if (['Gestor', 'Lider'].includes(user.role))
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  )
              })}
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <h3>Colaboradores</h3>
          </div>{" "}
        </div>
        <div className="flex flex-wrap gap-6 justify-start">
          {users.map((member, index) => (
            <label
              key={index}
              className="flex gap-4 p-4 border rounded-sm w-80 justify-between"
            >
              <div className="flex gap-4 ">
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  onChange={() => handleUsers(member)}
                />
                <img
                  src={member.imageUrl || "./user-solid.svg"}
                  alt={member.name}
                  className="rounded-full w-6 cyan-400"
                />
                <div>
                  <p>{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="mr-5 mt-4 w-32 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#4bacb4]"
          >
            Criar equipe
          </Button>
        </div>
      </form>
    </section>
  );
}
