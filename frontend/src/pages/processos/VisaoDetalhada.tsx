import DropdownPessoa from "@/components/buttons/DropdownPessoa";
import "@/styles/navigation.css";
import notificacao from '@/assets/visaoDetalhada/notificacao.svg'
import linha from '@/assets/visaoDetalhada/linha.svg'

function VisaoDetalhada() {
  return (
    <div className="body">
      <div className="flex">
        <div className="container">
          <img src={notificacao} alt="" className="notificacao" />
          <img src={linha} alt="" />
          <DropdownPessoa />
        </div>
      </div>
      <div className="grid-pai">
        <div className="Hoje">
          <h1 className="tituloHoje">Hoje</h1>
          <p className="dataHoje">09/08/2023</p>
          <br />
          <h1 className="processo">Processo XPTO</h1>
          <p className="processoTexto">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, dignissimos. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et in ea maxime id vero? Quas.</p>
        </div>
      </div>
    </div>
  );
}

export default VisaoDetalhada;
