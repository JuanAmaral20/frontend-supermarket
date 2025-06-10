import { Home, LayoutGrid, ShoppingBasket, User } from "lucide-react";

export const sidebarItems = [
  {
    icon: Home,
    title: "Início",
    link: "/home/admin",
  },
  {
    icon: User,
    title: "Usuários",
    link: "/usuarios/admin",
  },
  {
    icon: ShoppingBasket,
    title: "Produtos",
    link: "/produtos/admin",
  },
];
