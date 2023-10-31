import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Card, CardContent } from "./ui/card";
import { Users } from "@/interfaces/users";
// import { MoreHorizontal } from "lucide-react";

export interface UserTeam extends Users {
  fallbackName: string;
  toggleModal: any;
}

export function CardTeamView(
  { fallbackName, profileImage, name, role, email, phone, toggleModal }: UserTeam
) {
  return (
    // <Card className="px-3 py-3 cursor-pointer shadow-md flex gap-5 items-center">
    <DropdownMenu >
      <DropdownMenuTrigger className="px-3 py-3 cursor-pointer rounded shadow-md border-gray-20000 border-[1px] flex gap-5 items-center outline-none">

        <Avatar className="h-11 w-11">
          <AvatarImage src={profileImage} />
          <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>
        <CardContent className="flex p-0 justify-start items-center w-full">
          <div className="w-1/2 flex flex-col justify-center items-start ">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm font-normal">{role}</p>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-start">
            <p className="text-base font-semibold">Email: {email}</p>
            <p className="text-sm font-normal">Telefone: {phone}</p>
          </div>
        </CardContent>

        {/* <MoreHorizontal /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleModal} className="cursor-pointer">Solicitar documento</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Remover da equipe</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Chat</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // </Card>
  )
}