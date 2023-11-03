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
import { Bell, BellDot, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useContext, useState } from "react";
import { TitleContext } from "@/contexts/TitleContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

export function NavBar() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const { title } = useContext(TitleContext);
  const name = localStorage.getItem('name');
  const [notificationSelected, setNotificationSelected] = useState<boolean>(true);
  const notifications = [
    {
      title: "Nova mensagem",
      description: "Você tem uma nova mensagem não lida.",
      read: false
    },
    {
      title: "Lembrete de reunião",
      description: "Lembrete: Reunião importante às 14h.",
      read: true
    },
    {
      title: "Novo e-mail",
      description: "Você recebeu um novo e-mail.",
      read: false
    },
    {
      title: "Atualização de software",
      description: "Uma nova atualização de software está disponível.",
      read: true
    },
    {
      title: "Alerta de tráfego",
      description: "Tráfego intenso na sua rota usual para o trabalho.",
      read: false
    },
    {
      title: "Aniversário de um amigo",
      description: "Hoje é o aniversário do seu amigo João.",
      read: false
    },
    {
      title: "Promoção especial",
      description: "Promoção: 20% de desconto em produtos selecionados.",
      read: false
    },
    {
      title: "Lembrete de pagamento",
      description: "Lembrete: Vencimento da fatura do cartão de crédito.",
      read: true
    },
    {
      title: "Previsão do tempo",
      description: "Previsão do tempo para amanhã: Ensolarado, máxima de 25°C.",
      read: false
    },
    {
      title: "Tarefa pendente",
      description: "Lembrar de completar a tarefa até o final do dia.",
      read: false
    }
  ];
  return (
    <div className="p-6 flex w-full justify-between ">
      <h1 className="font-thin text-4xl pl-6 text">{title}</h1>
      <div className="flex justify-center items-center gap-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full h-[36px] w-[36px] p-0">
              {<BellDot color="red" size={21} />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-3">
            <div className="flex  border-b-[1px] border-black/20 ">
              <button
                onClick={() => setNotificationSelected(!notificationSelected)}
                className={cn("border-b-4 w-full", notificationSelected ? "border-[#53C4CD]" : "border-transparent")}
              >
                Informações
              </button>
              <button
                onClick={() => setNotificationSelected(!notificationSelected)}
                className={cn("border-b-4 w-full", !notificationSelected ? "border-[#53C4CD]" : "border-transparent")}
              >
                Tarefas
              </button>
            </div>

            <div className="w-full flex flex-col justify-start items-center gap-2 max-h-[300px] overflow-auto">
              {notifications.map((notify, index) => {
                if (notify.read && notificationSelected)
                  return (
                    <button 
                    key={index}
                    onClick={() => notify.read = true}
                    className="flex flex-col w-full bg-ionic-normal/20 rounded p-2 justify-start items-start">
                      <h1 className="text-left text-sm font-semibold w-full">{notify.title}</h1>
                      <p className="text-left text-xs w-full">{notify.description}</p>
                    </button>
                  )
                else if (!notify.read && !notificationSelected)
                  return (
                    <div key={index} className="flex flex-col w-full">
                      <h1 className="text-sm font-semibold">{notify.title}</h1>
                      <p className="text-xs">{notify.description}</p>
                    </div>
                  )
              })}
            </div>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={
              cn("p-3 rounded-3xl w-32 shadow-md border-[1px] border-black/20 cursor-pointer", theme === 'light' ? 'bg-white' : "bg-background-secondary")
            }
          >
            Open
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="flex justify-between cursor-pointer">
              Sair
              <LogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  )
}