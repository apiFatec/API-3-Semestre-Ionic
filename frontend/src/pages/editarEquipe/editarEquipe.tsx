import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { Users } from "@/interfaces/users";
import { TitleContext } from "@/contexts/TitleContext";
import teamsService from "@/services/teamsService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react";
import userServices from "@/services/userServices";

export function EditarEquipe() {
  const { id } = useParams();
  const { handleTitle } = useContext(TitleContext);
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState<Users>();
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    getTeam(id);
    handleTitle("Criar equipe");
  }, []);

  useEffect(() => {
    if (id) {
      getTeam(id);
    }
  }, [id]);

  async function getTeam(teamId: string | undefined) {
    try {
      const teamResponse = await teamsService.getOne(teamId);
      console.log(teamResponse.data.leader)
      setUsers(teamResponse.data.users);
      setTeamName(teamResponse.data.name);
      setTeamLeader(teamResponse.data.leader);
      handleTitle("Editar equipe");
      console.log(users);
    } catch (error) {
      console.error("Erro ao buscar os membros do time:", error);
    }
  }

  const handleDelete = async (userId: string | undefined) => {
    try {
      if (userId) {
        await userServices.removeFromTeam(userId);
      } else {
        console.log(
          "ID do usuário não especificado. Não é possível excluir o usuário da equipe."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir usuário da equipe:", error);
    }
  };

  const updateTeam = async (id: string) => {
    try {
      if (id) {
        const team = {
          name: teamName,
          leader: teamLeader,
        };

        await teamsService.updateTeam(id, team)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(
          "ID da equipe não definido. Não é possível atualizar a equipe."
        );
      }

    } catch (error) {
      console.error("Erro ao atualizar a equipe:", error);
    }
  };

  const fallbackName = (name: string) => {
    const splitName = name.split(' ')
    return splitName[0][0] + splitName[splitName.length - 1][0]
  }

  return (
    <section className="flex border p-5 rounded-lg m-auto w-[46rem] gap-4 flex-wrap ">
      <form className="max-h-[42rem] ml-4">
        <div className="mt-4 flex gap-6 flex-wrap items-center mb-4">
          <div className="flex gap-2 items-center">
            <h3>Time</h3>
            <input
              type="text"
              id="teamName"
              placeholder={teamName ? ` ${teamName}` : "Nome do time"}
              className="p-2 pr-6 border rounded"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <h3>Gestor da equipe</h3>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={teamLeader?.name} />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => {
                  if (["Gestor", "Lider", "Admin"].includes(user.role))
                    return (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    )
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <h3>Colaboradores</h3>
          </div>{" "}
        </div>
        <div className="flex flex-wrap gap-6 justify-start max-h-[30rem] overflow-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-4 p-4 border rounded-sm w-80 justify-between"
            >
              <div className="flex gap-4 ">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={user.profileImage || "./user-solid.svg"} />
                  <AvatarFallback>{fallbackName(user.name)}</AvatarFallback>
                </Avatar>

                <div>
                  <p>{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              <Popover>
                <PopoverTrigger className="cursor-pointer text-slate-500 text-5xl ">
                  <MoreHorizontal size={28} color="#999999" />
                </PopoverTrigger>
                <PopoverContent className="w-auto ">
                  <div className="flex items-center cursor-pointer bg-white shadow-md over:bg-gray-200 hover:duration-200 rounded gap">
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="cursor-pointer text-center hover:bg-gray-200 hover:duration-200  px-2 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end">
          <Button
            type="button"
            onClick={() => updateTeam(id!)}
            className="mr-5 mt-4 w-32 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#4bacb4]"
          >
            Salvar
          </Button>
        </div>
      </form>
    </section >
  );
}
