import "@/styles/visaoDetalhada/estiloPagina/perfilUsuario.css"
import { useEffect, useState } from "react"
import userServices from "@/services/userServices"

interface Users{
    id: string,
    name: string,
    role: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    adress: string,
    phone: string,
    profileImage: string
}


export function PerfilUsuario() {
    const [userL, setUser] = useState<Users>(
        {
            id: "",
            name: "",
            role: "",
            email: "",
            password: "",
            createdAt: "",
            updatedAt: "",
            deletedAt: "", 
            adress: "",
            phone: "",
            profileImage: "",
        }
    );
    


    useEffect(getUser,[])

    function getUser (){
        userServices.getOneUser(localStorage.getItem('token'))
        .then((resp) => {
            console.log(resp.data)
            setUser(resp.data)
        })
    }



    return (<div className="container">
        <div className="centralizar">
            <div className="container-profile">
                <img className="foto-redonda" src = {userL.profileImage}  alt="Foto" />
                <button>Editar Foto</button>
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
                            {userL.name}
                        </li>
                        <li>
                            {userL.role}
                        </li>
                        <li>
                            {userL.adress}
                        </li>
                        <li>
                            {userL.phone}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>)

}