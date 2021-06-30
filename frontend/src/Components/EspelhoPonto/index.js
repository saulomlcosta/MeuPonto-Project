import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import api from "../../services/baseApi";

import "./styles.css";

function UserReport() {

  const { addToast } = useToasts();
  const location = useLocation();
  const userId = localStorage.getItem("funcionario_id");
  const [dataReports, setDataReports] = useState([])


  async function getDataReports() {
    try {
      const { data } = await api.get("funcionarios/relatorios", {
        headers: {
          Authorization: userId,
        },
      });
      setDataReports(data)
      // setDataReports(data)
    } catch (error) {
      addToast("Erro na busca de dados.", {
        appearance: "error",
      });
    }
  }

  useEffect(() => {
    getDataReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);



  // function duracaoTotal(entrada1, saida1, entrada2, saida2) {
  //   let formatos = ['HH:mm', 'HH']; // formato do horário pode ser com ou sem os minutos
  //   let inicio = moment(entrada1, formatos);
  //   let fim = moment(saida1, formatos);
  //   // diferença entre a hora inicial e final
  //   let diff = moment.duration(fim.diff(inicio));

  //   inicio = moment(entrada2, formatos);
  //   fim = moment(saida2, formatos);
  //   // obter diferença entre a nova hora inicial e final e somar ao valor anterior
  //   diff.add(moment.duration(fim.diff(inicio)));

  //   return diff;
  // }

  // // duração de uma jornada normal de trabalho
  // // let jornadaNormal = duracaoTotal(dataReports.map((row) => row.entrada), (dataReports.map((row) => row.saida), '13:00', '18:00')
  // // duração efetivamente trabalhada
  // // let jornada = duracaoTotal('8', '12:06', '12:59', '17:00');

  // // // diferença entre as jornadas
  // // let diff = jornada.subtract(jornadaNormal);
  // // if (diff.asMinutes() != 0) {
  // //   // imprimir a quantidade de horas e minutos
  // //   console.log(`${Math.abs(diff.hours())} horas e ${Math.abs(diff.minutes())} minutos a ${diff.asMinutes() > 0 ? 'mais' : 'menos'}`);
  // // }

  console.log(dataReports.map((row) => row.entrada))
  console.log(dataReports.map((row) => row.saida))

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Entrada</TableCell>
            <TableCell>Saida Almoço</TableCell>
            <TableCell>Retorno Almoço</TableCell>
            <TableCell>Saida Lanche</TableCell>
            <TableCell>Retorno Lanche</TableCell>
            <TableCell>Saida</TableCell>
            <TableCell>Total de Horas Trabalhadas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataReports.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.created_at}
              </TableCell>
              <TableCell>{row.entrada}</TableCell>
              <TableCell>{row.saida_almoco}</TableCell>
              <TableCell>{row.retorno_almoco}</TableCell>
              <TableCell>{row.saida_lanche}</TableCell>
              <TableCell>{row.retorno_lanche}</TableCell>
              <TableCell>{row.saida}</TableCell>
              <TableCell>{row.hrs_trabalhadas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserReport;
