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
import { TeamView } from "@/pages/team/teamView";
import { PerfilUsuario } from "@/pages/perfilUsuario/perfilUsuario";
import { AprovarDocumento } from "@/pages/aprovarDocumento/aprovarDocumento";
import { CadastroIso } from "@/pages/cadastroIso/cadastroIso";
import { TelaTarefas } from "@/pages/telaTarefas/telaTarefas";
import { CriarEquipe } from "@/pages/criarEquipe/criarEquipe";
import { PaginaNaoEncontrada } from "@/pages/paginaNaoEncontrada/paginaNaoEncontrada";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />

      <Route element={<IsLogged />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/admin-register" element={<Register />} />
      </Route>

      <Route element={<LoginRoutes />}>
        <Route path="/perfil-usuario" element={<PerfilUsuario />} />
        <Route path="/editar-equipe/:id" element={<EditarEquipe />} />
        <Route path="/criar-equipe/" element={<CriarEquipe />} />
        <Route path="/criar-processo" element={<CadastroProcessos />} />
        <Route path="/aprovar-documento" element={<AprovarDocumento />} />
        <Route path="/processos" element={<Home />} />
        <Route path="/tarefas/:process/:id" element={<TelaTarefas />} />
        <Route path="/" element={<Home />} />
        <Route path="/processos/:process/:id" element={<Process />} />
        <Route path="/equipe/:id?" element={<TeamView />} />
        <Route path="/isos" element={<CadastroIso />} />
      </Route>

      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  );
}
