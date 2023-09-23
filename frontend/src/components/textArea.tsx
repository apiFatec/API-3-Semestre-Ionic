import { cn } from "@/lib/utils";

interface Props {
    label: string;
    id: string;
    setValue: any
}

export function TextArea({label, id, setValue}: Props) {
    return(
        <div className="py-2">
            <label htmlFor={id}>{label}</label>
            <textarea
                id="descricaoProcesso"
                className={cn(
                    "flex pt-1 pl-2 my-2 min-h-[80px] w-[16.875rem] rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}