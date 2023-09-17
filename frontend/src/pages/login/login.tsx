import { Card } from "@/components/ui/card";
import useLogin from "./useLogin";
import { SubmitHandler, useForm } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme.provider";
import { useState } from "react";
import { InputAnimated } from "@/components/InputAnimated";
import { Button } from "@/components/ui/button";

interface LoginFormValues {
  username: string;
  password: string;
}

export function Login() {
  const { theme } = useTheme();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const { loginUser, isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    loginUser(data); // Chame loginUser com os dados do formulário
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-[#53C4CD] w-[50%] flex flex-col items-center gap-14">
        {/* MUDAR COR DO SVG PARA TEMA ESCURO */}
        <img src="./Vector.svg" className="mt-[25%] text-ionic-normal" /> 
        <img src="./ionichealth.svg" className="text-white text-8xl" />
      </div>

      <div className="bg-white w-[50%] flex flex-col items-center justify-start pt-[8%] px-40 gap-3">
        <img src="./logo.svg" className="w-24"/>
        <p className="text-3xl mb-10">Entre na sua conta</p>

        <InputAnimated
          label="Usuário"
          id="email"
          type="email"
          {...register('username')}
        />

        <InputAnimated
          label="Senha"
          id="senha"
          type="password"
          {...register('password')}
        />

        <div className="flex justify-between py-2 w-full mb-12">
          <div className="flex items-center gap-2">
          <input type="checkbox" className="h-5 w-5 rounded-full" />
            <label htmlFor="remember">Lembre-se de mim</label>
          </div>
          <button className="text-gray-500">Esqueceu-se da senha?</button>
        </div>
        <Button className="bg-ionic-normal active:bg-ionic-pressed hover:bg-ionic-normal w-full h-16 font-semibold text-3xl" >Entrar</Button>
      </div>

    </div>
  )
}