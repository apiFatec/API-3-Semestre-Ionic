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
import userServices from "@/services/userServices";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("o nome é obrigatório")
    .refine((name) => /^[A-Za-z\s]+$/.test(name), {
      message: "o nome deve conter apenas letras e espaços",
    }),
  password: z.string().nonempty("a senha é obrigatória"),
  email: z
    .string()
    .nonempty("o email é obrigatório")
    .email("formato de email inválido"),
  gender: z
    .string()
    .nonempty("o gênero é obrigatório")
    .refine((gender) => /^[A-Za-z\s]+$/.test(gender), {
      message: "o gênero deve conter apenas letras",
    }),
  adress: z
    .string()
    .nonempty("o endereço é obrigatório")
    .refine((adress) => /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/.test(adress), {
      message: "o endereço deve conter apenas letras, números e espaços",
    }),
  phone: z
    .string()
    .nonempty("o telefone é obrigatório")
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Este campo deve conter apenas números.",
    }),
  birthdate: z.date(),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

export interface RegisterFormValues {
  name: string;
  password: string;
  email: string;
  gender: string;
  adress: string;
  phone: string;
  birthdate: Date;
  role: string;
}

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues, createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });
  const [role, setRole] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    data.role = role;
    userServices.CreateUser(data);
    userServices
      .CreateUser(data)
      .then((response) => {
        alert(`tudo certo!`);
      })
      .catch((error) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="col-start-1 cold-end-2 bg-background-login ">
        <div className="">
          <img
            src={theme === "light" ? "./Vector.svg" : "./Vector_dark.svg"}
            className="mt-[15%] ml-[34%] pb-24 w-48 text-ionic-normal justify-center"
          />
          <img src="./ionichealth.svg" className="w-2/3 ml-[12%]" />
        </div>
      </div>

      <div>
        <div className="mb-20 flex"></div>

        <div className="flex justify-around gap-44 relative">
          <span className="w-4 h-4 bg-ionic-normal absolute z-[-1] left-[4rem] rounded"></span>
          <p className="text-3xl pb-20 font-regular left-4">
            Cadastrar novo colaborador
          </p>
          <Button
            onClick={() => navigate("/")}
            className="rounded-3xl bg-background-secondary 'text-sidebar-text shadow-md hover:bg-background-secondary/10"
          >
            <ArrowLeft className="text-primary" />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 px-20 py-10"
        >
          <section>
            <div className="mb-11">
              <BoxInput
                label="Nome Completo"
                id="name"
                name="name"
                placeholder="Digite o nome completo"
                type="text"
                register={register}
              />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {" "}
                  {errors.name?.message}{" "}
                </span>
              )}
            </div>
            <div className="mb-12">
              <BoxInput
                label="E-mail"
                id="email"
                name="email"
                placeholder="Digite o email do colaborador"
                type="email"
                register={register}
              />
              {errors.email && (
                <span className="text-sm text-red-600">
                  {" "}
                  {errors.email?.message}{" "}
                </span>
              )}
            </div>
            <div className="mb-11">
              <BoxInput
                label="Sexo"
                id="gender"
                name="gender"
                placeholder="Digite o genero"
                type="text"
                register={register}
              />
              {errors.gender && (
                <span className="text-sm text-red-600">
                  {" "}
                  {errors.gender?.message}{" "}
                </span>
              )}
            </div>
            <div className="w-[85%] flex flex-col gap-0 justify-center mb-11 justify-self-center">
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
          </section>
          <section>
            <div className="mb-11">
              <BoxInput
                label="Senha"
                id="password"
                name="password"
                placeholder="Digite a senha"
                type="text"
                register={register}
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  {" "}
                  {errors.password?.message}{" "}
                </span>
              )}
            </div>
            <div className="mb-11">
              <BoxInput
                label="Endereço"
                id="adress"
                name="adress"
                placeholder="Digite o endereço do colaborador"
                type="text"
                register={register}
              />
              {errors.adress && (
                <span className="text-sm text-red-600">
                  {" "}
                  {errors.adress?.message}{" "}
                </span>
              )}
            </div>
            <div className="mb-11">
              <BoxInput
                label="telefone"
                id="phone"
                name="phone"
                placeholder="Digite o telefone do colaborador"
                type="text"
                register={register}
              />
              {errors.phone && (
                <span className="text-sm text-red-600">
                  {" "}
                  {errors.phone?.message}{" "}
                </span>
              )}
            </div>
            <div className="mb-11">
              <BoxInput
                label="data de nascimento do colaborador"
                id="birthdate"
                name="birthdate"
                placeholder="Digite a data de nascimento do colaborador"
                type="Date"
                register={register}
              />
            </div>
            <Button className="bg-ionic-normal active:bg-ionic-pressed hover:bg-ionic-normal h-12 font-medium text-1xl  w-[90%] text-white">
              Cadastrar
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}
