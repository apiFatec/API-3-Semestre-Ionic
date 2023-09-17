import { cn } from "@/lib/utils";
import { useState } from 'react';

interface Props {
  label: string;
  id: string;
  type: string;
}

export function InputAnimated({ label, id, type }: Props) {
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
          cn("relative cursor-text transition-top ease-in-out duration-300 h-6", inputFocus ? "top-0 text-sm" : "top-7")
        }
      >
        {label}
      </label>

      <input
        onFocus={() => setInputFocus(true)}
        onBlur={handleBlur}
        type={type}
        id={id}
        className="border-b-[1px] border-black w-[100%] text-base p-1 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}