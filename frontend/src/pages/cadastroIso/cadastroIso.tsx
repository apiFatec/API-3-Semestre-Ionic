import { Input } from "@/components/InputForm";
import { InputFile } from "@/components/InputFormFile";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function CadastroIso() {

    return(
        <main className=" ml-8 mt-4">
            <h1 className="text-3xl">Cadastrar ISO</h1>
            
            <form className="grid grid-cols-2 justify-items-center ">
                <div className="rounded-md mt-8 justify-items-center w-[24rem] p-[1.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                <Input
                    label="Nome do processo"
                    id="name"
                    type="text" setValue={undefined}                  
                />
                
                <TextArea
                  label="Descrição"
                  id="description"
                  setValue={undefined}
                />

                <div>
                    <InputFile onChange={null} label={"Anexar ISO"} id={"InputFile"} type={"file"} />
                    <Button>Enviar</Button>
                </div>
                
                </div>
                    
                <div className="rounded-md mt-8 justify-items-center ml-[-10rem] w-[19rem] p-[1.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                    <label>Requisitos Regulamentares</label>
                    <ScrollArea className="mt-2 p-4 h-[21rem] w-[16.875rem] rounded-md border">

                    </ScrollArea>
                </div>
            
            </form>
        </main>
    )
}