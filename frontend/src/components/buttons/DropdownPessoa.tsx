import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown";

  import '@/styles/dropdown.css'
  import '@/styles/navigation.css'
  import roberta from '@/assets/visaoDetalhada/Roberta.svg'
  
  function DropdownPessoa() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger id="dropdownBasic">
          <div className="componentes">
            <img src={roberta} alt="" />
            <p>Roberta</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="conteudo">
          <DropdownMenuLabel>Time</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="item">João</DropdownMenuItem>
          <DropdownMenuItem className="item">Marcelo</DropdownMenuItem>
          <DropdownMenuItem className="item">Flávio</DropdownMenuItem>
          <DropdownMenuItem className="item">Garibaldo</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

export default DropdownPessoa;