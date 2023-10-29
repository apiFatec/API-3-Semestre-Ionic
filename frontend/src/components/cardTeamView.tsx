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
import { MoreHorizontal } from "lucide-react";

export function CardTeamView() {
  return (
    <Card className="px-3 py-3 cursor-pointer shadow-md flex gap-5 items-center">
      <Avatar className="h-11 w-11">
        <AvatarImage src="../../public/lula.jpg" />
        <AvatarFallback>TC</AvatarFallback>
      </Avatar>
      <CardContent className="flex p-0 justify-start items-center w-full">
        <div className="w-1/2">
          <p className="text-lg font-semibold">Talison Cardoso</p>
          <p className="text-sm font-normal">Gestor</p>
        </div>
        <div className="w-1/2">
          <p className="text-base font-semibold">Email: nicota1234@gmail.com</p>
          <p className="text-sm font-normal">Telefone: (12) 997089629</p>
        </div>
      </CardContent>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none self-start"><MoreHorizontal /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Talison</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Solicitar documento</DropdownMenuItem>
          <DropdownMenuItem>Remover da equipe</DropdownMenuItem>
          <DropdownMenuItem>Chat</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  )
}