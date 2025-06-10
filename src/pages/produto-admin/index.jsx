import { ContainerAdminPage } from "../../components/container-admin-page";
import { ShoppingBasket, Trash2, UserPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { ModalProduto } from "../../components/modal-produtos";
import { parseCookies } from "nookies";
import axios from "axios";

export const Teste = () => {
  // const { products, setProducts } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const nomeProdRef = useRef(null);
  const descricaoRef = useRef(null);
  const precoRef = useRef(null);
  const descontoRef = useRef(null);
  const vencimentoRef = useRef(null);
  const urlImagemRef = useRef(null);

  async function getProducts() {
    const token = parseCookies().token;

    const response = await axios.get("http://18.118.30.233/produtos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function addProduto(ev) {
    ev.preventDefault();
    const token = parseCookies().token;

    const response = await axios.post(
      "http://18.118.30.233/produtos",
      {
        nome: nomeProdRef.current.value,
        descricao: descricaoRef.current.value,
        preco: Number(precoRef.current.value),
        porcentagem: Number(descontoRef.current.value),
        dataVencimento: vencimentoRef.current.value,
        imagemUrl: urlImagemRef.current.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      limparInputs();
      getProducts();
      fecharModal();
      return alert("Produto cadastrado com sucesso!");
    }
  }

  function abrirModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
  }

  function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  function limparInputs() {
    nomeProdRef.current.value = "";
    descricaoRef.current.value = "";
    precoRef.current.value = "";
    descontoRef.current.value = "";
    vencimentoRef.current.value = "";
    urlImagemRef.current.value = "";
  }

  function handleProductSelectedClick(product) {
    setProductSelected(product);
    setIsOpen(true);
  }

  async function deleteProduct(id) {
    const token = parseCookies().token;

    await axios.delete(`http://18.118.30.233/produtos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getProducts();
  }
  function fecharModalUpdate() {
    setIsOpen(false);
    setProductSelected(null);
  }
  return (
    <ContainerAdminPage>
      <h1 className="title">Sistema de administração - Usuários</h1>
      <div className="info-geral-prod">
        <button className="info" onClick={abrirModal}>
          <ShoppingBasket className="tamanho-padrao" />
          <p className="tamanho-info">Cadastrar Produto</p>
        </button>
        <h1>Tabela de Produtos</h1>
      </div>
      <table className="table-produto">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço (R$)</th>
            <th>Porcentagem de Desconto (%)</th>
            <th>Preço com desconto</th>
            <th>Data de Vencimento</th>
            <th>Imagem</th>
            <th>Ações</th>
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
                {(
                  product.preco -
                  product.preco * (product.porcentagem / 100)
                ).toFixed(2)}
              </td>
              <td>{product.dataVencimento}</td>
              <td className="td-imagem">
                <img
                  src={product.imagemUrl}
                  alt="Image"
                  className="image-table"
                />
              </td>
              <td>
                <div className="acoes">
                  <UserPen
                    className="edit"
                    onClick={() => {
                      handleProductSelectedClick(product);
                    }}
                  />
                  <Trash2
                    className="delete"
                    onClick={() => deleteProduct(product.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="modal" className="modal-geral">
        <div onClick={fecharModal} className="modal-fechar" />
        <div className="modal">
          <div className="title">
            <p>Cadastrar Produto</p>
          </div>
          <form onSubmit={addProduto} className="form">
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Nome do Produto
              </label>
              <input
                className="input-atributos"
                type="text"
                name="nome"
                id="nome"
                placeholder="Digite o nome do produto"
                ref={nomeProdRef}
              />
            </div>
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Descrição
              </label>
              <input
                className="input-atributos"
                type="text"
                name="nome"
                id=""
                placeholder="Digite a descrição do produto"
                ref={descricaoRef}
              />
            </div>
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Preço
              </label>
              <input
                className="input-atributos"
                type="number"
                name="nome"
                id=""
                placeholder="Digite o preço do produto"
                ref={precoRef}
              />
            </div>
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Porcentagem de Desconto
              </label>
              <input
                className="input-atributos"
                type="number"
                name="email"
                id=""
                placeholder="Digite a porcentagem de desconto "
                ref={descontoRef}
              />
            </div>
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                Data de Vencimento
              </label>
              <input
                className="input-atributos"
                type="date"
                name="email"
                id=""
                placeholder="Digite a data de vencimento "
                ref={vencimentoRef}
              />
            </div>
            <div className="input-padrao">
              <label className="label-padrao" htmlFor="">
                URL da Imagem
              </label>
              <input
                className="input-atributos"
                type="text"
                name="email"
                id=""
                ref={urlImagemRef}
                placeholder="URL"
              />
            </div>
            <button className="btn-cadastrar-user" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>

      {isOpen && productSelected && (
        <ModalProduto
          product={productSelected}
          fecharModal={fecharModalUpdate}
          setIsOpen={setIsOpen}
          getProducts={getProducts}
        />
      )}
    </ContainerAdminPage>
  );
};
