import { SideBar } from "../sidebar";
import "./style.css";

export const ContainerAdminPage = ({ children }) => {
  return (
    <div className="container-admin">
      <SideBar />

      <main className="container-main">{children}</main>
    </div>
  );
};
