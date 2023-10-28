import { TeamCard } from "@/components/TeamCard";


export function VisualizarEquipe() {


    return (
        <div className=" ml-8 mt-4">
            <div>
                <h1 className="text-3xl">Organograma</h1>
                <h2>Time de processos</h2>
            </div>

            <div className="flex flex-col items-center">
                <div className="grid grid-rows-4 max-w-fit mt-10 ">
                    <ul> 
                        <li><TeamCard /></li>
                    </ul>

                    <ul> 
                        <li><TeamCard /></li>
                    </ul>

                    <ul> 
                        <li><TeamCard /></li>
                    </ul>

                    <ul> 
                        <li><TeamCard /></li>
                    </ul>
                    
                 </div>
            </div>
        </div>
    )
}