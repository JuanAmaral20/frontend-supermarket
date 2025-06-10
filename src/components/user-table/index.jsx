import { Trash2, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import "./style.css";
import { parseCookies } from "nookies";
import axios from "axios";

export const UserTable = ({ getUsuarios, users, setUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const [nome, setNome] = useState(userSelected?.nome ?? "");
  const [email, setEmail] = useState(userSelected?.email ?? "");
  const [cpf, setCpf] = useState(userSelected?.cpf ?? "");
  const [senha, setSenha] = useState(userSelected?.senha ?? "");
  const [role, setRole] = useState(userSelected?.role ?? "");

  useEffect(() => {
    getUsuarios();
  }, []);

  async function deletarUsuario(id) {
    const token = parseCookies().token;

    const response = await axios.delete(
      `http://localhost:3000/usuarios/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      getUsuarios();
    }
  }

  function handleUserSelectedClick(user) {
    setUserSelected(user);

    setIsOpen(true);
  }

  async function updatedUser(ev) {
    ev.preventDefault();

    const token = parseCookies().token;

    const user = {
      nome: nome ?? userSelected.nome,
      email: email ?? userSelected.email,
      cpf: cpf ?? userSelected.cpf,
      senha: senha ?? userSelected.senha,
      tipoUsuario: role ?? userSelected.tipoUsuario,
    };

    const response = await axios.put(
      `http://localhost:3000/usuarios/${userSelected.id}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      getUsuarios();
      setIsOpen(false);
    }

    getUsuarios();
  }

  function fecharModal() {
    setIsOpen(false);
    setUserSelected(null);
  }

  return (
    <>
      {isOpen && userSelected && (
        <div id="teste-modal">
          <div onClick={fecharModal} className="container-fechar-modal" />
          <div className="modal">
            <div className="title">
              <p>Editar Usuário</p>
            </div>
            <form onSubmit={updatedUser} className="form">
              <div className="input-padrao">
                <label className="label-padrao" htmlFor="nome">
                  Nome
                </label>
                <input
                  className="input-email-senha"
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Digite seu nome"
                  defaultValue={userSelected?.nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="input-padrao">
                <label className="label-padrao" htmlFor="cpf">
                  CPF
                </label>
                <input
                  className="input-email-senha"
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder="Digite seu CPF"
                  defaultValue={userSelected.cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className="input-padrao">
                <label className="label-padrao" htmlFor="email">
                  Email
                </label>
                <input
                  className="input-email-senha"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Digite seu email"
                  defaultValue={userSelected.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-padrao">
                <label className="label-padrao" htmlFor="senha">
                  Senha
                </label>
                <input
                  className="input-email-senha"
                  type="text"
                  name="senha"
                  id="senha"
                  placeholder="Digite sua senha"
                  defaultValue={userSelected.senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="input-padrao">
                <label className="label-padrao" htmlFor="role">
                  Tipo de usuário
                </label>
                <select
                  defaultValue={userSelected.tipoUsuario}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option className="opt-padrao" value="ADMIN">
                    Admin
                  </option>
                  <option className="opt-padrao" value="CLIENT">
                    Cliente
                  </option>
                </select>
              </div>
              <button className="btn-cadastrar-user" type="submit">
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.nome}</td>
              <td>{user.cpf}</td>
              <td>{user.email}</td>
              <td>
                <div
                  className={
                    user.tipoUsuario === "ADMIN"
                      ? "badge-role-admin"
                      : "badge-role-user"
                  }
                >
                  {user.tipoUsuario}
                </div>
              </td>
              <td>{user.dataCadastro}</td>
              <td>
                <div className="acoes">
                  <UserPen
                    className="edit"
                    onClick={() => {
                      handleUserSelectedClick(user);
                    }}
                  />
                  <Trash2
                    className="delete"
                    onClick={() => deletarUsuario(user.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
