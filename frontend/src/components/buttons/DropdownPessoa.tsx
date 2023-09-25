import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown";

  import '@/styles/visaoDetalhada/estiloComponente/dropdownPessoa.css'
  import roberta from '@/assets/visaoDetalhada/Roberta.svg'
  
  function DropdownPessoa() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger id="visaoDetalhada_dropdownBasic">
          <div className="visaoDetalhada_componentes">
            <img src={roberta} alt=""/>
            <p>Roberta</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="visaoDetalhada_conteudoDropdown">
          <DropdownMenuLabel>Time</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="visaoDetalhada_itemDropdown">João</DropdownMenuItem>
          <DropdownMenuItem className="visaoDetalhada_itemDropdown">Marcelo</DropdownMenuItem>
          <DropdownMenuItem className="visaoDetalhada_itemDropdown">Flávio</DropdownMenuItem>
          <DropdownMenuItem className="visaoDetalhada_itemDropdown">Garibaldo</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

export default DropdownPessoa;