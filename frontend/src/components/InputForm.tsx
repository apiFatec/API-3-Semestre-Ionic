import { cn } from "@/lib/utils";

interface Props {
    label: string;
    id: string;
    type: string;
    setValue: any;
}

export function Input({ label, id, type, setValue } : Props){
    return(
        <div className="center-normal py-2">
                <label htmlFor={id} className="text-base">
                    {label}
                </label>
            <input
                type={type}
                id={id}
                className={cn(
                    "flex my-2 h-10 w-[16.875rem] px-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}
                onChange={(e) => setValue(e.target.value)}
            />

        </div>
    )
}