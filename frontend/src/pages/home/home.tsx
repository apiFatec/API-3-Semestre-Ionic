import IonicText from "../../assets/IonicText.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function Home() {
  const [findAll, setDadosDoProcesso] = useState(null);
  
  useEffect(() => {
    async function carregarDadosDoProcesso() {
      const dados = await findAll();
      if (dados) {
        setDadosDoProcesso(dados); 
      }
    }

    carregarDadosDoProcesso();
  }, []);

  return (
    <body className="mx-16">
      <nav className="p-8">nav</nav>
      <section className="flex justify-between">
        <div>
          <img src={IonicText} alt="Minha Imagem" />
          <p className="text-gray-600">Acompanhamento de processos</p>
        </div>
        <div className="flex gap-[1rem] items-end mr-[8rem]">
          <Button className="border-solid border-[1px] border-gray-200 bg-white text-gray-400 font-normal text-[9pt] active:bg-ionic-pressed hover:bg-ionic-normal hover:text-white w-[8rem] h-12 hover:border-hidden">
            Novo processo
          </Button>
          <Input
            className="h-12 w-[25rem] placeholder:text-gray-400 "
            placeholder="Pesquisar processo..."
          ></Input>
        </div>
      </section>
      <main className="grid grid-cols-3 gap-20px mt-16">
      if (dadosDoProcesso) {
        return (
          <section>
            <h3>Backlog</h3>
            <div className="mt-8 flex-column p-[1.4rem] h-[10rem] max-w-[400px] rounded-md shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)]">
              <p className="text-gray-600 font-light text-[14pt]">
              {findAll.name}
              </p>
            </div>
          </section>
          <section>
            <h3>Em Andamento</h3>
            <div className="mt-8 flex-column p-[1.4rem] h-[10rem] max-w-[400px] rounded-md shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)]">
              <p className="text-gray-600 font-light text-[14pt]">
              {findAll.name}
              </p>
            </div>
          </section>
          <section>
            <h3>Finalizado</h3>
            <div className="mt-8 flex-column p-[1.4rem] h-[10rem] max-w-[400px] rounded-md shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)]">
              <p className="text-gray-600 font-light text-[14pt]">
              {findAll.name}
              </p>
            </div>
          </section>
  )
}
      </main>
    </body>
  );
}
