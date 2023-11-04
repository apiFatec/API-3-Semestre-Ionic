import taskService from "@/services/taskService";
import userServices from "@/services/userServices";
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import { InputFile } from "./InputFormFile";

interface Props {
    taskId: string | undefined;
    func : any;
}

export function TaskFileModal({ taskId, func }: Props) {
    const [file, setFile] = useState<any>();
    const [user, setUser] = useState<any>(
        {
            id: '',
            name: '',
        }
    )

    async function getUserLogged(token: string | null) {
        userServices.getOneUser(token)
            .then((response) => {
                setUser(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }


    function handleFileChange(e: any) {
        getUserLogged(localStorage.getItem('token'));
        setFile(e.target.files[0]);
    }

    function handleSubmit(taskId: string | undefined, user: any) {
        console.log(file);

        const formData = new FormData();
        formData.append('arquivo', file);

        taskService.postFile(taskId, user.id, user.name, formData)
            .then((response) => {
                console.log(response)
                alert('Arquivo enviado');
                func();
            }).catch(error => console.log(error))
    }

    return (
        <>
            <div>
                <InputFile onChange={handleFileChange} label={"Adicione o arquivo do seu computador"} id={"InputFile"} type={"file"} />

                <Button onClick={() => handleSubmit(taskId, user)}>Enviar</Button>
            </div>
        </>
    )
}