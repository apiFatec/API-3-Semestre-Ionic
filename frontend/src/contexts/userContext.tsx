import { Users } from "@/interfaces/users";
import userServices from "@/services/userServices";
import { createContext, useEffect, useState } from "react";

interface UserInterfaceContext {
  address: string,
  name: string,
  email: string,
  role: string,
  profileImage: string,
  birthdate: string,
  deletedAt: string,
  createdAt: string,
  gender: string,
  id: string,
  files: string,
  phone: string,
  updatedAt: string,
  teams: string;
}

const defaultUserValue: UserInterfaceContext = {
  address: "",
  name: "",
  email: "",
  role: "",
  profileImage: "",
  birthdate: "",
  deletedAt: "",
  createdAt: "",
  gender: "",
  id: "",
  files: "",
  phone: "",
  updatedAt: "",
  teams: ""
}

interface Context {
  user: UserInterfaceContext,
  id: string,
  setId: (id: string) => void
}

export const UserContext = createContext<Context>({
  user: defaultUserValue,
  id: "",
  setId: () => { },
});



export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    address: "",
    name: "",
    email: "",
    role: "",
    profileImage: "",
    birthdate: "",
    deletedAt: "",
    createdAt: "",
    gender: "",
    id: "",
    files: "",
    phone: "",
    updatedAt: "",
    teams: ""
  });
  const [id, setId] = useState<string>(localStorage.getItem('id')!);

  useEffect(() => {
    getUser(id);
  }, [id]);

  async function getUser(id: string) {
    userServices.getOneUser(id)
      .then((response) => {
        const data = response.data;
        setUser({ ...data, teams: data.teams?.id });
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <UserContext.Provider value={{ user, id, setId }}>
      {children}
    </UserContext.Provider >
  );
}