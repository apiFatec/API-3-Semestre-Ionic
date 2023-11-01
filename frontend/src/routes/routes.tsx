import { Routes, Route } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";
import PrivateRoutes from "./PrivateRoutes";
import { Home } from "@/pages/home/home";
import IsLogged from "./IsLogged";
import { CadastroProcessos } from "@/pages/cadastroProcesso/cadastroProcesso";
import { Process } from "@/pages/process/process";
import { EditarEquipe } from "@/pages/editarEquipe/editarEquipe";
import { TelaTarefas } from "@/pages/telaTarefas/telaTarefas";
import { PaginaNaoEncontrada } from "@/pages/paginaNaoEncontrada/paginaNaoEncontrada";

export function Router() {
  return (
    <Routes>
      <Route element={<IsLogged />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/admin-register" element={<Register />} />
      </Route>
        <Route path="/criar-equipe/" element={<EditarEquipe />} />
        <Route path="/criar-processo" element={<CadastroProcessos />} />
        <Route path="/processos" element={<Home />} />
        <Route path="/telaTarefas/:process/:id" element={<TelaTarefas />} />
        <Route path="/" element={<Home />} />
        <Route path="/processos/:process/:id" element={<Process />} />
      <Route element={<LoginRoutes />}>
      </Route>

      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  );
}
