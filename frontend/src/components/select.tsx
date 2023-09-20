import { cn } from "@/lib/utils";

interface Props {
    label: string;
    id: string;
}

export default function SelectForm({label, id}:Props) {
    return(
        <div className="py-2">
            <label htmlFor={id} className="">
                {label}
            </label>
            <select 
                id={id}
                className={cn(
                    "flex w-[16.875rem] h-10 my-2 overflow-hidden rounded-md border bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2")}
            />
        </div>
    )
}