import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user-context";
import axios from "axios";
import { parseCookies } from "nookies";
import { Sprout } from "lucide-react";

export const ModalProduto = ({
  product,
  fecharModal,
  setIsOpen,
  getProducts,
}) => {
  const [nomeProduto, setNomeProduto] = useState(product?.nome ?? "");
  const [descricao, setDescricao] = useState(product?.descricao ?? "");
  const [preco, setPreco] = useState(product?.preco ?? 0);
  const [desconto, setDesconto] = useState(product?.porcentagem ?? 0);
  const [vencimento, setVencimento] = useState(product?.dataVencimento ?? "");
  const [urlImage, setUrlImage] = useState(product?.imagemUrl ?? "");

  async function atualizarProdutos(ev) {
    ev.preventDefault();
    const token = parseCookies().token;

    const produto = {
      nome: nomeProduto,
      descricao: descricao,
      preco: Number(preco),
      porcentagem: Number(desconto),
      dataVencimento: vencimento,
      imagemUrl: urlImage,
    };

    const response = await axios.put(
      `http://18.118.30.233/produtos/${product.id}`,
      produto,
      {
        headers: {
          Authorization: `Berear ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setIsOpen(false);
      getProducts();
    }
  }

  return (
    <div id="teste-modal">
      <div onClick={fecharModal} className="container-fechar-modal" />
      <div className="modal">
        <div className="title">
          <p>Atualizar Produto</p>
        </div>
        <form onSubmit={atualizarProdutos} className="form">
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
              defaultValue={product.nome}
              onChange={(e) => setNomeProduto(e.target.value)}
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
              id="nome"
              placeholder="Digite a descrição do produto"
              defaultValue={product.descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
              id="nome"
              placeholder="Digite o preço do produto"
              defaultValue={product.preco}
              onChange={(e) => setPreco(e.target.value)}
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
              id="email"
              placeholder="Digite a porcentagem de desconto "
              defaultValue={product.porcentagem}
              onChange={(e) => setDesconto(e.target.value)}
            />
          </div>
          <div className="input-padrao">
            <label className="label-padrao" htmlFor="">
              Data de Vencimento
            </label>
            <input
              className="input-atributos"
              type="text"
              name="email"
              id="email"
              placeholder="Digite a data de vencimento "
              defaultValue={product.dataVencimento}
              onChange={(e) => setVencimento(e.target.value)}
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
              id="email"
              placeholder="URL"
              defaultValue={product.imagemUrl}
              onChange={(e) => setUrlImage(e.target.value)}
            />
          </div>
          <button className="btn-cadastrar-user" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};
