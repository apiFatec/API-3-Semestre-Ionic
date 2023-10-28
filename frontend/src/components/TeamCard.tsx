import { PhotoProfile } from "./photoProfile";

export function TeamCard(){
    return(
    <div className="flex flex-row mb-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <div className="mt-1 mr-3"><PhotoProfile/> </div>  
            <div className="flex flex-col ">
                <p>Nome Sobrenome</p>
                <p>Cargo</p>
            </div> 
        </div> 
    )   
}