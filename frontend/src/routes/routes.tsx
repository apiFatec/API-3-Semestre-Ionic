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
import { CriarEquipe } from "@/pages/criarEquipe/criarEquipe";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route element={<IsLogged />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}></Route>
      <Route element={<LoginRoutes />}>
        <Route path="/editar-equipe/:id" element={<EditarEquipe />} />
        <Route path="/criarEquipe/" element={<CriarEquipe />} />
        <Route path="/criar-processo" element={<CadastroProcessos />} />
        <Route path="/processos" element={<Home />} />
        <Route path="/telaTarefas/:process/:id" element={<TelaTarefas />} />
        <Route path="/" element={<Home />} />
        <Route path="/processos/:process/:id" element={<Process />} />
      </Route>
    </Routes>
  );
}
