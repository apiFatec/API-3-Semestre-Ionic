import React, { useState } from "react";

interface Props {
  label: string;
  register: any;
  name: string;
  id: string;
  type: string;
  placeholder: string;
  /* hasError?: boolean; */ // Adiciona a propriedade hasError
}

export function BoxInput({ label, register, name, id, type, placeholder}: Props) {
  return (
    <div className="w-[85%] flex flex-col gap-0 justify-center  justify-self-center relative">
      <label className="font-regular" htmlFor={id}>
        {label}
      </label>
      <input
        className={'border-b mb-1 mt-4 p-2 border-neutral-300 outline-none bg-inherit focus:border-ionic-normal focus:shadow-outline-blue transition-all duration-150'}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}
