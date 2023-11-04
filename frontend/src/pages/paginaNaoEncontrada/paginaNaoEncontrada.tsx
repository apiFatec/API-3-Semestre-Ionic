import robozin from "../../assets/robozin.svg";
import { Button } from "@/components/ui/button";

export function PaginaNaoEncontrada() {
  const voltarHome = () => {
    window.location.href = "/";
  };
  return (
    <div
      className="grid justify-center items-center"
      style={{ gridTemplateColumns: "1fr" }}
    >
      <section className="mt-32">
        <div className="flex gap-32 justify-center items-center">
          <div>
            <img src={robozin} alt="" />
          </div>
          <div className="text-center">
            <h1 className="text-6xl mb-8">Página não encontrada</h1>
            <p className="text-3xl mb-16">
              Não encontramos a página que você <br /> está procurando{" :( "}
            </p>
            <Button
              onClick={voltarHome}
              className="bg-ionic-normal active:bg-ionic-pressed hover:bg-ionic-pressed hover:text-slate-50 h-14 font-normal text-1xl w-[40%] text-black shadow-md rounded-full"
            >
              Voltar para home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
