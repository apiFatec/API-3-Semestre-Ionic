import "@/styles/visaoDetalhada/estiloPagina/perfilUsuario.css"
import { useEffect, useState } from "react"
import userServices from "@/services/userServices"
import { EditPicture } from "@/components/ModalEditPicture"
import { Users } from "@/interfaces/users"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




export function PerfilUsuario() {
    const [modal, setModal] = useState<boolean>(false)
    const [userL, setUser] = useState<Users>();

    useEffect(getUser, [modal])

    function getUser() {
        userServices.getOneUser(localStorage.getItem('id')!)
            .then((resp) => {
                console.log(resp.data)
                setUser(resp.data)
            })
    }

    const fallbackName = (name: string | undefined) => {
        const splitName = name?.split(' ')
        if (splitName)
            return splitName[0][0] + splitName[splitName.length - 1][0]
    }


    return (<div className="container">
        <div className="centralizar">
            <div className="container-profile">
                {/* <img className="foto-redonda" src={userL?.profileImage} alt="Foto" /> */}
                <Avatar className="h-64 w-64 shadow-md border-black/20 border-[1px]">
                    <AvatarImage src={userL?.profileImage} />
                    <AvatarFallback className="text-6xl">{fallbackName(userL?.name)}</AvatarFallback>
                </Avatar>
                <button onClick={() => setModal(true)}> Editar Foto </button>
                {modal && (
                    <EditPicture userName={userL?.name!} id={userL?.id!} closeModal={setModal} />

                )}

            </div>
            <div className="info-perfil">
                <h1 className="titulo">Meu Perfil</h1>
                <div className="info-usuario">
                    <ul className="row-user">
                        <li>
                            Nome
                        </li>
                        <li>
                            Cargo
                        </li>
                        <li>
                            Endereço
                        </li>
                        <li>
                            Contato
                        </li>
                    </ul>
                    <ul>
                        <li>
                            {userL?.name}
                        </li>
                        <li>
                            {userL?.role}
                        </li>
                        <li>
                            {userL?.address}
                        </li>
                        <li>
                            {userL?.phone}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>)

}