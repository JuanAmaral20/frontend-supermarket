import { createBrowserRouter } from "react-router-dom";
import { UsuariosAdmin } from "./pages/usuario-admin";
import { Admin } from "./pages/admin-home";
import ClientHome from "./pages/client-home";
import Login from "./pages/auth/login";
import { Teste } from "./pages/produto-admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <ClientHome />,
  },
  {
    path: "/home/admin",
    element: <Admin />,
  },
  {
    path: "/usuarios/admin",
    element: <UsuariosAdmin />,
  },
  {
    path: "/produtos/admin",
    element: <Teste />,
  },
]);

export default router;
