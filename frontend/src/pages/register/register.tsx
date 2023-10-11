import { BoxInput } from "@/components/BoxInput";
import { useTheme } from "@/components/theme.provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterFormValues } from "@/interfaces/resterFormValues";
import userServices from "@/services/userServices";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Register() {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const [role, setRole] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    data.role = role;
    userServices
      .CreateUser(data)
      .then((response) => {
        alert(`tudo certo!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-background-login w-[50%] flex flex-col items-center gap-14">
        <img
          src={theme === "light" ? "./Vector.svg" : "./Vector_dark.svg"}
          className="mt-[25%] text-ionic-normal"
        />
        <img src="./ionichealth.svg" className="w-2/3" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] bg-background flex flex-col p-20"
      >
        <div className="flex justify-between">
          <h1 className="text-left font-extrabold text-3xl mb-12">
            Registration
          </h1>
          <Button
            onClick={() => navigate("/")}
            className="rounded-3xl bg-background-secondary 'text-sidebar-text shadow-md hover:bg-background-secondary/10"
          >
            <ArrowLeft className="text-primary" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 shadow-xl p-3 rounded items-center justify-center w-full">
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
            <label className="font-semibold" htmlFor="nivel">
              Nivel
            </label>
            <Select onValueChange={(e) => setRole(e)}>
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

          <Button className="bg-ionic-normal active:bg-ionic-pressed hover:bg-ionic-normal h-14 font-semibold text-2xl col-span-2 w-[80%] justify-self-center text-white">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
