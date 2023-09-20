import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown";

  import '@/styles/dropdown.css'
  
  
  function DropdownPessoa() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger id="dropdownBasic">
          <img src="" alt="" />
          <p>Roberta</p>
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