import { Routes, Route } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";
import PrivateRoutes from "./PrivateRoutes";
import { Home } from "@/pages/home/home";
import IsLogged from "./IsLogged";
import { CadastroProcessos } from "@/pages/cadastroProcesso/cadastroProcesso";
import { Process } from "@/pages/process/process";

export function Router() {
  return (
    <Routes>
      <Route element={<IsLogged />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/admin-register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
      </Route>
      <Route element={<LoginRoutes />}>
        <Route path="/criar-processo" element={<CadastroProcessos />} />
        <Route path="/processos" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/processos/:process/:id" element={<Process />} />
      </Route>
    </Routes>
  );
}
