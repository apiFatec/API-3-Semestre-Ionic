import { Input } from "@/components/InputForm";
import { InputFile } from "@/components/InputFormFile";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import isoService from "@/services/isoService";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

export function CadastroIso() {
    const [titleIso, setTitleIso] = useState<string>('');
    const [descIso, setDescIso] = useState<string>('');
    const [isoFile, setIsoFile] = useState<any>();

    function handleIsoFile(e : any){
        const file = e.target.file[0]
        setIsoFile(file);
        console.log(file);
    }

    function cadastrarIso(){
        const formData = new FormData();
        formData.append('file', isoFile);
        formData.append('title', titleIso);
        formData.append('description', descIso);

        isoService.postIso(formData)
        .then((response) => {
            console.log(response.data)
            alert("ISO cadastrada!")
        })
    }

    return(
        <main className=" ml-8 mt-4">
            <h1 className="text-3xl">Cadastrar ISO</h1>
            
            <form className="grid grid-cols-2 justify-items-center ">
                <div className="rounded-md mt-8 justify-items-center w-[24rem] p-[1.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                <Input
                    label="Nome do processo"
                    id="name"
                    type="text" setValue={setTitleIso}                  
                />
                
                <TextArea
                  label="Descrição"
                  id="description"
                  setValue={setDescIso}
                />

                <div>
                    <InputFile onChange={handleIsoFile} label={"Anexar ISO"} id={"InputFile"} type={"file"} />
                    <Button onClick={cadastrarIso}>Enviar</Button>
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