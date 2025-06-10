import axios from "axios";
import { ShoppingBasket, User } from "lucide-react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { ContainerAdminPage } from "../../components/container-admin-page";
import "./style.css";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const token = parseCookies().token;

    const response = await axios.get("http://18.118.30.233:80/produtos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(response.data);
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

  useEffect(() => {
    getProducts();
    getUsuarios();
  }, []);

  return (
    <ContainerAdminPage>
      <h1 className="title-admin">Sistema de administração - Supermarket</h1>
      <div className="info-geral">
        <a className="info" href="/usuarios/admin">
          <User className="tamanho-padrao" />
          <p className="tamanho-info">Usuários:</p>
          <p className="tamanho-info">{users.length}</p>
        </a>

        <a className="info" href="/produtos/admin">
          <ShoppingBasket className="tamanho-padrao" />
          <p className="tamanho-info">Produtos:</p>
          <p className="tamanho-info">{products.length}</p>
        </a>
      </div>

      <div>
        <table>
          <caption>
            <strong>Lista dos últimos usuários cadastrados:</strong>
          </caption>
          <thead>
            <tr>
              <th>Usuários</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Tipo de Usuário</th>
              <th>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
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
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <caption>
            <strong>Lista dos últimos produtos cadastrados:</strong>
          </caption>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço (R$)</th>
              <th>Porcentagem de Desconto (%)</th>
              <th>Preço com deconto</th>
              <th>Data de Vencimento</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.nome}</td>
                <td>{product.descricao}</td>
                <td>{product.preco}</td>
                <td>{product.porcentagem}</td>
                <td>
                  {product.preco - product.preco * (product.porcentagem / 100)}
                </td>
                <td>{product.dataVencimento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContainerAdminPage>
  );
};
