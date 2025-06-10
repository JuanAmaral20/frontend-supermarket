import { useContext, useState } from "react";
import "./style.css";
import { FormCriarConta } from "./formcriarconta";
import FormLogin from "./formlogin";
import { UserContext } from "../../contexts/user-context";

export default function Login() {
  const { users, setUsers } = useContext(UserContext);

  const [isOpenNewAccount, setIsOpenNewAccount] = useState(false);

  function renderizarFormularioCriarConta() {
    setIsOpenNewAccount((state) => !state);
  }

  return (
    <>
      <div className="container">
        <img src="/supermarket-img.png" alt="" className="background-img" />
        <div className="container-login">
          {!isOpenNewAccount && (
            <FormLogin
              setIsOpenNewAccount={setIsOpenNewAccount}
              users={users}
              renderizarFormularioCriarConta={renderizarFormularioCriarConta}
            />
          )}
          {/* Modal para criar conta */}
          {isOpenNewAccount && (
            <FormCriarConta
              setIsOpenNewAccount={setIsOpenNewAccount}
              setUsers={setUsers}
              users={users}
              renderizarFormularioCriarConta={renderizarFormularioCriarConta}
            />
          )}
        </div>
      </div>
    </>
  );
}
