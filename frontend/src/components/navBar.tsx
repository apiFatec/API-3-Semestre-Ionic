import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme.provider"
import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useContext } from "react";
import { TitleContext } from "@/contexts/TitleContext";

export function NavBar() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const { title } = useContext(TitleContext);

  return (
    <div className="p-6 flex w-full justify-between ">
      <h1 className="font-thin text-4xl pl-6 text">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            cn("p-3 rounded-3xl w-32 shadow-md border-[1px] border-black/20 cursor-pointer", theme === 'light' ? 'bg-white' : "bg-background-secondary")
          }
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="flex justify-between cursor-pointer">
            Sair
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}