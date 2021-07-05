import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import Relogio from "../../Components/Relogio";
import UserReport from "../../Components/EspelhoPonto";
import moment from "moment";
import "./styles.css";

import api from "../../services/baseApi";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function Ponto() {
  const { addToast } = useToasts();
  const location = useLocation();
  const history = useHistory();
  const userName = localStorage.getItem("nome_funcionario");
  const userId = localStorage.getItem("funcionario_id");
  const [tipoBatida, setTipoBatida] = useState();
  const [aba, setAba] = useState(0);

  async function handleCheckPoint(event) {
    let dataAtualCreated_At = moment(new Date()).format("DD/MM/YYYY");
    let horaAtual = moment(new Date()).format("HH:mm");
    event.preventDefault();

    const data = {
      entrada: horaAtual,
      saida_almoco: tipoBatida === "Inicio de almoço" ? horaAtual : null,
      retorno_almoco: tipoBatida === "Retorno de almoço" ? horaAtual : null,
      saida_lanche: tipoBatida === "Inicio de lanche" ? horaAtual : null,
      retorno_lanche: tipoBatida === "Retorno de lanche" ? horaAtual : null,
      saida: tipoBatida === "Saída" ? horaAtual : null,
      tipo_batida: tipoBatida,
      hrs_trabalhadas: null,
      created_at: dataAtualCreated_At,
    };
    try {
      await api.post("registros/inserir", data, {
        headers: {
          Authorization: userId,
        },
      });
      addToast("Registro cadastrado com sucesso!", {
        appearance: "success",
      });
    } catch (error) {
      addToast(error.response.data, {
        appearance: "warning",
      });
    }
  }
  const handleChangeTabs = (event, newValue) => {
    setAba(newValue);
  };


  useEffect(() => {
    if (!userId) {
      addToast("Você precisa está logado para acessar essa pagina.", {
        appearance: "warning",
      });
      history.push("/");
    }

  }, [location]);

  return (
    <div className="box-container">
      <div className="content">
        <Tabs
          value={aba}
          onChange={handleChangeTabs}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Registro de Ponto" value={0} />
          <Tab label="Espelho de ponto" value={1} />
        </Tabs>
        {aba === 0 ? (
          <section className="form">
            <Relogio />
            <form onSubmit={handleCheckPoint}>
              <h3>Olá, {userName}.</h3>

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Opções de registro
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipoBatida}
                  onChange={(event) => setTipoBatida(event.target.value)}
                >
                  <MenuItem value={"Entrada"}>Entrada</MenuItem>
                  <MenuItem value={"Inicio de almoço"}>
                    Inicio de almoço
                  </MenuItem>
                  <MenuItem value={"Retorno de almoço"}>
                    Retorno de almoço
                  </MenuItem>
                  <MenuItem value={"Inicio de lanche"}>
                    Inicio de lanche
                  </MenuItem>
                  <MenuItem value={"Retorno de lanche"}>
                    Retorno de lanche
                  </MenuItem>
                  <MenuItem value={"Saída"}>Saida(Para verificar horas trabalhadas, enviar 2x Saída)</MenuItem>
                </Select>
              </FormControl>

              <button className="button" type="submit">
                Registrar Ponto
              </button>
            </form>
          </section>
        ) : (
          <UserReport />
        )}
      </div>
    </div>
  );
}
