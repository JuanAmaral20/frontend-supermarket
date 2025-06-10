import { useContext, useRef, useState } from "react";
import { ContainerAdminPage } from "../../components/container-admin-page";
import { UserContext } from "../../contexts/user-context";
import { UserTable } from "../../components/user-table";
import { UserPlus } from "lucide-react";
import "./styles.css";
import InputMask from "react-input-mask";
import axios from "axios";
import { parseCookies } from "nookies";

export const UsuariosAdmin = () => {
  const [users, setUsers] = useState([]);

  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);
  const roleRef = useRef(null);

  function limparInputs() {
    nomeRef.current.value = "";
    cpfRef.current.value = "";
    emailRef.current.value = "";
    senhaRef.current.value = "";
  }

  function abrirModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
  }

  function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  async function getUsuarios() {
    const token = parseCookies().token;

    const response = await axios.get("http://18.118.30.233:80/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data);
  }

  async function adicionarUsers(ev) {
    ev.preventDefault();

    let nome = nomeRef.current.value;
    let cpf = cpfRef.current.value;
    let email = emailRef.current.value;
    let senha = senhaRef.current.value;
    let role = roleRef.current.value.toUpperCase();

    if (nome === "") {
      return alert("Por favor, preencha todos os campos!");
    }
    if (cpf === "") {
      return alert("Por favor, preencha todos os campos!");
    }
    if (email === "") {
      return alert("Por favor, preencha todos os campos!");
    }
    if (senha === "") {
      return alert("Por favor, preencha todos os campos!");
    }

    try {
      await axios.post("http://18.118.30.233:80/usuarios", {
        nome,
        cpf,
        email,
        senha,
        tipoUsuario: role,
        fotoPerfil:
          "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
      });
      limparInputs();
      getUsuarios();
      fecharModal();
    } catch (error) {
      if (error.response.status === 409) {
        return alert("Email ou CPF já cadastrado!");
      }
    }
  }

  return (
    <ContainerAdminPage>
      <h1 className="title">Sistema de administração - Usuários</h1>
      <div className="info-geral">
        <button onClick={abrirModal} className="info" href="">
          <UserPlus className="tamanho-padrao" />
          <p className="tamanho-info">Cadastrar Usuários</p>
        </button>
      </div>

      <div id="modal" className="modal-geral">
        <div onClick={fecharModal} className="modal-fechar" />
        <div className="modal">
          <div className="title">
            <p>Cadastrar Usuário</p>
          </div>
          <form onSubmit={adicionarUsers} className="form">
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Nome
              </label>
              <input
                className="input-email-senha"
                type="text"
                name="nome"
                id="nome"
                placeholder="Digite seu nome"
                ref={nomeRef}
              />
            </div>
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                CPF
              </label>
              <InputMask
                mask={"999.999.999-99"}
                className="input-email-senha"
                type="text"
                name="nome"
                id="nome"
                placeholder="Digite seu CPF"
                ref={cpfRef}
              />
            </div>
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
                ref={emailRef}
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
                ref={senhaRef}
              />
            </div>

            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Tipo de usuário
              </label>
              <select ref={roleRef} defaultValue={"CLIENT"}>
                <option className="opt-padrao" value="ADMIN">
                  Admin
                </option>
                <option className="opt-padrao" value="CLIENT" defaultChecked>
                  Cliente
                </option>
              </select>
            </div>
            <button className="btn-cadastrar-user" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>

      <UserTable users={users} getUsuarios={getUsuarios} setUsers={setUsers} />
    </ContainerAdminPage>
  );
};
