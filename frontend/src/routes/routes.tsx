import { Dashboard } from "@/pages/dashboard/dashboard";
import { Routes, Route } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  )
}