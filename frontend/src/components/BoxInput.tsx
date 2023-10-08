interface Props {
  label: string;
  register: any;
  name: string;
  id: string;
  type: string;
  placeholder: string;
}

export function BoxInput({ label, register, name, id, type, placeholder }: Props) {
  return (
    <div className="w-[85%] flex flex-col gap-0 justify-center mb-8 justify-self-center">
      <label className="font-regular" htmlFor={id}>{label}</label>
      <input
        className="border-b mb-4 mt-4  p-2 border-neutral-300 outline-none bg-inherit focus:border-ionic-normal focus:shadow-outline-blue transition-all duration-150"
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  )
}