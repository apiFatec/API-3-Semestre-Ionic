import { BoxInput } from "@/components/BoxInput";
import { InputAnimated } from "@/components/InputAnimated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface RegisterFormValues {
  name: string;
  password: string;
  email: string;
  role: string;
}

export function Register() {

  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const [role, setRole] = useState("");

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    data.role = role;
    console.log(data);
  }
  return (
    <div className="flex min-h-screen">
      <div className="bg-background-secondary w-[50%] flex flex-col items-center gap-14">
        <img src="./Vector.svg" className="mt-[35%] text-ionic-normal" />
        <img src="./ionichealth.svg" className="w-2/3" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[50%] bg-background flex flex-col p-20">
        <h1 className="text-left font-extrabold text-3xl mb-12">Registration</h1>

        <div className="grid grid-cols-2 gap-3 shadow-xl p-3 rounded items-center justify-center w-full">

          {/* <div className="w-[85%] flex flex-col gap-2 justify-center mb-8 justify-self-center">
            <label className="font-semibold" htmlFor="email">Nome Completo</label>
            <Input type="text" className="" id="email" />
          </div> */}

          <BoxInput
            label="Nome Completo"
            id="name"
            name="name"
            placeholder="Digite o nome completo"
            type="text"
            register={register}
          />
          <BoxInput
            label="E-mail"
            id="email"
            name="email"
            placeholder="Digite o email do colaborador"
            type="email"
            register={register}
          />

          <div className="w-[85%] flex flex-col gap-0 justify-center mb-8 justify-self-center">
            <label className="font-semibold" htmlFor="nivel">Nivel</label>
            <Select onValueChange={() => ({ ...register('role') })} >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C-Level">C-Level</SelectItem>
                <SelectItem value="Gestor">Gestor</SelectItem>
                <SelectItem value="Lider">Lider</SelectItem>
                <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <BoxInput
            label="Senha"
            id="password"
            name="password"
            placeholder="Digite a senha"
            type="text"
            register={register}
          />

          <Button className="bg-ionic-normal active:bg-ionic-pressed hover:bg-ionic-normal h-14 font-semibold text-2xl col-span-2 w-[80%] justify-self-center text--white" >Cadastrar</Button>

        </div>
      </form >
    </div >
  );
}