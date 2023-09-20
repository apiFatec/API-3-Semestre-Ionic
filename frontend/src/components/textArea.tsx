import { cn } from "@/lib/utils";

interface Props {
    label: string;
    id: string
}

export function TextArea({label, id}: Props) {
    return(
        <div className="py-2">
            <label htmlFor={id}>{label}</label>
            <textarea
                id="descricaoProcesso"
                className={cn(
                    "flex my-2 min-h-[80px] w-[16.875rem] rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}   
            />
        </div>
    )
}