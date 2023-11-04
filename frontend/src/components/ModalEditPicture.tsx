import { useState } from "react"
import { Button } from "./ui/button"
import userServices from "@/services/userServices"
import { InputFile } from "./InputFormFile";

interface Props {
    userName: string;
    id: string;
    closeModal: any;

}


function submitPicture(userName: string, id: string, closeModal: any, picture: any | null) {
    const data = new FormData();
    data.append("image", picture)
    userServices.sendPicture(userName, id, data).then((response) => {
        console.log(response)
        alert(`Foto Alterada com Sucesso!`)
        closeModal(false)

    }).catch((error) => {
        console.log(error)
        alert(`Erro ao enviar a Foto!`)
    })


}

export function EditPicture({ userName, id, closeModal }: Props) {
    const [picture, setPicture] = useState<any>()
    function handlePictureChange(e: any) {
        setPicture(e.target.files[0])
        console.log(e.target.files[0])

    }

    return (
        <>
            <div className="bg-black opacity-50 inset-0 absolute"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => closeModal(false)}>
                <div className="bg-white z-10 p-4 rounded-lg w-1/5 ml-[20%] max-h-[600px]" onClick={(e) => e.stopPropagation()}>
                    <InputFile label={"Adicionar Foto"} id={"pic"} type={"file"} onChange={handlePictureChange} />
                    <Button onClick={() => closeModal(false)}> Cancelar </Button>
                    <Button onClick={() => submitPicture(userName, id, closeModal, picture)}> Salvar </Button>
                </div>
            </div>

        </>
    )


}