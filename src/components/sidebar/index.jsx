import "./style.css";

import { sidebarItems } from "../../_contants/sidebar-items";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { destroyCookie } from "nookies";

export const SideBar = () => {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const { userLogged } = useContext(UserContext);

  function handleLogOutCLick() {
    destroyCookie(null, "token");
    navigate("/");
  }

  return (
    <nav className="sidebar">
      <div className="header-sidebar">
        <div className="navs">
          {sidebarItems.map(({ icon: MyIcon, title, link }) => (
            <button
              key={link}
              onClick={() => navigate(link)}
              className={`sidebarNav ${location === link && "sidebarSelected"}`}
            >
              <MyIcon />
              {title}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleLogOutCLick}>Sair</button>
    </nav>
  );
};
