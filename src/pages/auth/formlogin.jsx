import axios from "axios";
import { setCookie } from "nookies";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";

export default function FormLogin({
  setIsOpenNewAccount,
  renderizarFormularioCriarConta,
}) {
  const { setUserLogged } = useContext(UserContext);
  const emailLoginRef = useRef(null);
  const senhaLoginRef = useRef(null);
  const navigate = useNavigate();

  function limparInputs() {
    emailLoginRef.current.value = "";
    senhaLoginRef.current.value = "";
  }

  async function fazerLogin(event) {
    event.preventDefault();

    let email = emailLoginRef.current.value;
    let senha = senhaLoginRef.current.value;

    if (email === "") {
      return alert("Por favor, preencha todos os campos!");
    }
    if (senha === "") {
      return alert("Por favor, preencha todos os campos!");
    }

    const response = await axios.post("http://localhost:3000/login", {
      email,
      senha,
    });

    if (response.status === 401) {
      limparInputs();
      return alert("Usuário não existente!");
    }

    const { token, user } = response.data;

    setCookie(null, "token", token);

    setUserLogged(user);
    if (user.tipoUsuario === "ADMIN") {
      navigate("/home/admin");
    } else {
      navigate("/home");
    }
  }

  function renderizarFormularioCriarConta() {
    setIsOpenNewAccount((state) => !state);
  }

  return (
    <>
      <div className="title">
        <p>Login</p>
      </div>
      <form onSubmit={fazerLogin} className="form">
        <div className="input-padrao">
          <label className="label-padrao" htmlFor="">
            Email
          </label>
          <input
            className="input-email-senha"
            type="email"
            name="nome"
            id="nome"
            placeholder="Digite seu email"
            ref={emailLoginRef}
          />
        </div>
        <div className="input-padrao">
          <label className="label-padrao" htmlFor="">
            Senha
          </label>
          <input
            className="input-email-senha"
            type="password"
            name="email"
            id="email"
            placeholder="Digite sua senha"
            ref={senhaLoginRef}
          />
        </div>

        <p className="tst">
          Não possui conta?
          <button
            type="button"
            className="criar-conta"
            onClick={renderizarFormularioCriarConta}
          >
            Fazer Cadastro
          </button>
        </p>

        <button className="btn-login">Acessar</button>
      </form>
    </>
  );
}
