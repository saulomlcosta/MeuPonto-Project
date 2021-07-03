import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
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
  }, [location]);




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
