import axios from "axios";
import { useRef } from "react";
import InputMask from "react-input-mask";

export function FormCriarConta({
  setIsOpenNewAccount,
  setUsers,
  users,
  renderizarFormularioCriarConta,
}) {
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);
  const fotoPerfilRef = useRef(null);

  function limparInputs() {
    nomeRef.current.value = "";
    cpfRef.current.value = "";
    emailRef.current.value = "";
    senhaRef.current.value = "";
    fotoPerfilRef.current.value = "";
  }

  async function realizarCadastro(event) {
    event.preventDefault();

    let nome = nomeRef.current.value;
    let cpf = cpfRef.current.value;
    let email = emailRef.current.value;
    let senha = senhaRef.current.value;
    let fotoPerfil = fotoPerfilRef.current.value;

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

    const response = await axios.post("http://18.118.30.233/usuarios", {
      nome,
      cpf,
      email,
      senha,
      fotoPerfil,
    });

    if (response.status === 409) {
      limparInputs();
      return alert("Email/CPF já cadastrado!");
    }

    alert("Cadastrado com sucesso!");

    setIsOpenNewAccount(false);
  }

  return (
    <>
      <div className="title">
        <p>Cadastro</p>
      </div>
      <form onSubmit={realizarCadastro} className="form">
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
            Foto do Perfil
          </label>
          <input
            className="input-email-senha"
            type="text"
            name="email"
            id="ftperfil"
            placeholder="Digite a URL da foto do perfil"
            ref={fotoPerfilRef}
          />
        </div>

        <p className="tst">
          Já possui conta?
          <button
            type="button"
            className="criar-conta"
            onClick={renderizarFormularioCriarConta}
          >
            Fazer Login
          </button>
        </p>
        <button className="btn-login" type="submit">
          Cadastrar
        </button>
      </form>
    </>
  );
}
