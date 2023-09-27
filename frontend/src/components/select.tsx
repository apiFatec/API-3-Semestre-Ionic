import { cn } from "@/lib/utils";

interface Users {
    id: string;
    name: string;
    role: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Props {
    label: string;
    id: string;
    setValue: any;
    users: Array<Users>;
    value: Users;
}

export function SelectForm({ label, id, setValue, users, value }: Props) {
    return (
        <div className="py-2">
            <label htmlFor={id} className="">
                {label}
            </label>
            <select required
                id={id}
                className={cn(
                    "flex w-[16.875rem] h-10 my-2 p-2 overflow-hidden rounded-md border bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2")}
                value={JSON.stringify(value)}
                onChange={(e) => (console.log(e.target.value), setValue(JSON.parse(e.target.value)))}
            >
                <option key={'default'} disabled >Selecione</option>

                {users.map((user, index) => {
                    if (user.role === "Lider" || user.role === "Gestor")
                    return (
                        <option selected={index === 0 ? true : false} key={index} value={JSON.stringify(user)}>{user.name}</option>
                    )
                })}
            </select>
        </div>
    )
}