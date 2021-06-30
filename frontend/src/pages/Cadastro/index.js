import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import api from "../../services/baseApi";

import "./styles.css";

export default function Cadastro() {

  const { addToast } = useToasts();

  const [nome, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsApp] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();
    const data = {
      nome,
      cpf,
      email,
      whatsapp,
      cidade,
      uf,
    };
    try {
      const response = await api.post("funcionarios/cadastrar", data);
      addToast(`Seu ID de acesso: ${response.data.id}`, {
        appearance: "success"
      });
      history.push("/");
    } catch (error) {
      addToast("Erro no cadastro, tente novamente.", {
        appearance: "error"
      });
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section className="header">
          <h1>Geração de ID</h1>
          <p>
            Lembrando, seu ID é único e intransferível. Não divida com outras
            pessoas.
          </p>

          <Link to="/">Já tem ID? Pois venha acessar!</Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome Completo"
            value={nome}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            placeholder="CPF, (apenas números)"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(event) => setWhatsApp(event.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(event) => setUf(event.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}