import { cn } from "@/lib/utils";
import { useState } from 'react';

interface Props {
  label: string;
  id: string;
  type: string;
  register:  any;
  name: string;
}

export function InputAnimated({ label, id, type, register, name }: Props) {
  const [inputFocus, setInputFocus] = useState<Boolean>(false);
  const [value, setValue] = useState("");
  
  function handleBlur() {
    if (value) {
      setInputFocus(true);
    } else {
      setInputFocus(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-start justify-start h-fit">
      <label
        htmlFor={id}
        className={
          cn("relative cursor-text text-primary transition-top ease-in-out duration-300 h-6", inputFocus || value ? "top-0 text-sm" : "top-7")
        }
      >
        {label}
      </label>

      <input
        autoComplete="true"
        onFocus={() => setInputFocus(true)}
        onBlur={handleBlur}
        type={type}
        id={id}
        className="border-b-[1px] border-black w-[100%] text-base p-1 outline-none bg-inherit"
        {...register(name)} // Use props.name para atribuir a referência correta
      />
    </div>
  );
}