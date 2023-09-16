import { Card } from "@/components/ui/card";
import useLogin from "./useLogin";
import { SubmitHandler, useForm } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme.provider";

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
    <div className="flex flex-col items-center">
      <div className="mb-8 pt-4 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          BERMUDA
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Ionic healt - System Workflow
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}
        className="px-4 md:px-20 lg:px-32 space-y-4">
        <Card
          className={`p-4 w-fit border-black/5 flex items-center justify-center hover:shadow-md transition ${theme === "dark" ? "bg-white" : "bg-slate-900" // Use o tema atual para aplicar a classe CSS correta
            }`}
        >
          <div className="flex items-center gap-x-4 flex-col space-y-4">
            <input className={`w-64  rounded p-3 text-white outline-none
            ${theme === "dark" ? "bg-slate-900" : "bg-slate-400"}
            `}
              type="email"
              {...register('username')} placeholder="Email"
            />
            <input className={`w-64  rounded p-3 text-white outline-none
            ${theme === "dark" ? "bg-slate-900" : "bg-slate-400"}
            `}
              type="password"
              {...register('password')} placeholder="Senha"
            />
            <button
              className={`p-3 rounded w-64 ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}
              type="submit"
            >
              Entrar
            </button>
          </div>
        </Card>
      </form>

    </div>
  )
}