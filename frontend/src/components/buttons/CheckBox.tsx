"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import '@/styles/visaoDetalhada/estiloComponente/status.css'

export function CheckboxDemo({label, onclick, status}:{label:string, onclick:() => void, status:string}) {
  return (
    <div className="flex justify-between items-center space-x-2 mb-5">
      <div>
      <Checkbox id="terms" onClick={onclick} className="self start"/>
        <label
          htmlFor="terms"
          className="text-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
        >
          {label}
        </label>
      </div>
      <div className={cn("statusFinalizado",status === 'finalizado' ? "bg-[#DFF5F2] text-[#3ABBBA]" : "bg-[#E3EFFD] text-[#6AA6F2]")}>
        {status}
      </div>
    </div>
  )
}

export default CheckboxDemo;
