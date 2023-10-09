import { Button } from "@/components/ui/button";

export function EditarEquipe() {
  return (
    <section className="grid grid-cols-2 border p-4 rounded-lg m-auto w-fit gap-4">
      <div className="mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3>Nome da equipe</h3>
          <input
            type="text"
            name="time"
            id="time"
            placeholder="Time de processos"
            className="p-2 pr-6 border rounded"
          />
        </div>
        <div className="flex gap-4 items-center ">
          <h3>Colaboradores</h3>
          <Button
            variant={"outline"}
            className="text-gray-300 font-thin text-center"
          >
            Adicionar colaborador
          </Button>
        </div>
        <div className="flex gap-4 p-4 border rounded-sm">
          <img src="/" alt="img" className="rounded-full" />
          <div>
            <p>Roberta Diaz</p>
            <p className="text-xs text-gray-500	">Gestora de processos</p>
          </div>
          <a href="/" className="ml-12 text-zinc-700 text-sm  ">
            Editar
          </a>
        </div>
        <div className="flex gap-4 p-4 border rounded-sm">
          <img src="/" alt="img" className="rounded-full" />
          <div>
            <p>Roberta Diaz</p>
            <p className="text-xs text-gray-500	">Gestora de processos</p>
          </div>
          <a href="/" className="ml-12 text-zinc-700 text-sm  ">
            Editar
          </a>
        </div>
        <div className="flex gap-4 p-4 border rounded-sm">
          <img src="/" alt="img" className="rounded-full" />
          <div>
            <p>Roberta Diaz</p>
            <p className="text-xs text-gray-500	">Gestora de processos</p>
          </div>
          <a href="/" className="ml-12 text-zinc-700 text-sm  ">
            Editar
          </a>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3>Gestor da equipe</h3>
          <input
            type="text"
            name="gestor"
            id="gestor"
            placeholder="Roberta Diaz"
            className="p-2 pr-6 border rounded"
          />
        </div>
        <div></div>
        <div className="flex gap-4 p-4 border rounded-sm mt-10">
          <img src="/" alt="img" className="rounded-full" />
          <div>
            <p>Roberta Diaz</p>
            <p className="text-xs text-gray-500	">Gestora de processos</p>
          </div>
          <a href="/" className="ml-12 text-zinc-700 text-sm  ">
            Editar
          </a>
        </div>
        <div className="flex gap-4 p-4 border rounded-sm">
          <img src="/" alt="img" className="rounded-full" />
          <div>
            <p>Roberta Diaz</p>
            <p className="text-xs text-gray-500	">Gestora de processos</p>
          </div>
          <a href="/" className="ml-12 text-zinc-700 text-sm  ">
            Editar
          </a>
        </div>
        <div className="flex gap-4 p-4 border rounded-sm">
          <img src="/" alt="img" className="rounded-full" />
          <div>
            <p>Roberta Diaz</p>
            <p className="text-xs text-gray-500	">Gestora de processos</p>
          </div>
          <a href="/" className="ml-12 text-zinc-700 text-sm  ">
            Editar
          </a>
        </div>
      </div>
    </section>
  );
}
