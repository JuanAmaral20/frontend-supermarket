import CarLogo from "../../assets/cart.svg";
import "./style.css";
import axios from "axios";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user-context";

function ClientHome() {
  const [products, setProducts] = useState([]);

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

  const { userLogged } = useContext(UserContext);

  return (
    <>
      <header>
        <div className="logo-supermarket">
          <img className="img-logo-supermarket" src={CarLogo} alt="" />
          <h2 className="name-supermarket">Supermarket</h2>
        </div>
        <div className="user-div">
          <img className="img-user" src={userLogged.fotoPerfil} alt="" />
          <p className="user">Olá, {userLogged.nome} </p>
        </div>
      </header>
      <h1 className="title-prod">Produtos disponíveis</h1>
      <section>
        {products.map((element) => (
          <div className="card-product">
            <img src={element.imagemUrl} alt="" className="img-product" />
            <div className="container-card-data">
              <span className="name-product">{element.nome}</span>
              {element.porcentagem > 0 ? (
                <div className="container-card-promotion">
                  <span className="price-old-promotion">
                    R$ {element.preco.toFixed(2)}
                  </span>
                  <span className="price-promotion">
                    R${" "}
                    {element.preco -
                      element.preco * (element.porcentagem / 100).toFixed(2)}
                  </span>
                </div>
              ) : (
                <p className="price-promotion">R$ {element.preco.toFixed(2)}</p>
              )}

              <p>{element.descricao}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default ClientHome;
