import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useToasts } from "react-toast-notifications";

import api from '../../services/baseApi';


import './styles.css';

export default function Logon() {
  const { addToast } = useToasts();
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await api.post('login', { id });
      localStorage.setItem("funcionario_id", id);
      localStorage.setItem("nome_funcionario", response.data.nome);

      history.push("/ponto");
    } catch (error) {
      addToast('Falha no login, tente novamente.', {
        appearance: "error"
      });
    }
  }

  return (
    <div className="logon-container">
      <div className="content">
        <section className="form">

          <h1 className="logo">MeuPonto</h1>

          <form>
            <h1>Olá! Por favor, identifique-se para entrar.</h1>

            <input
              placeholder="Sua ID"
              value={id}
              onChange={event => setId(event.target.value)}
            />
            <button onClick={handleLogin} className="button" type="submit">Login</button>

            <span>Não tem ID?</span>
            <Link to="/cadastro">
              Venha gerar a sua agora!
            </Link>
          </form>
        </section>
      </div>
    </div>
  )
}