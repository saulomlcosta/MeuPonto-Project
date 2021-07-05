const moment = require('moment');
const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const data = request.body;
    const funcionarios_id = request.headers.authorization;
    var dataAtual = moment(new Date()).format("DD/MM/YYYY");

    const registros = await connection("registros")
      .where("funcionarios_id", funcionarios_id)
      .select("*");

    function diferencaHoras(horaInicial, horaFinal) {

      // Tratamento se a hora inicial é menor que a final	
      if (!isHoraInicialMenorHoraFinal(horaInicial, horaFinal)) {
        aux = horaFinal;
        horaFinal = horaInicial;
        horaInicial = aux;
      }

      hIni = horaInicial.split(':');
      hFim = horaFinal.split(':');

      horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
      minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

      if (minutosTotal < 0) {
        minutosTotal += 60;
        horasTotal -= 1;
      }

      horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
      return horaFinal;
    }

    function isHoraInicialMenorHoraFinal(horaInicial, horaFinal) {
      horaIni = horaInicial.split(':');
      horaFim = horaFinal.split(':');

      // Verifica as horas. Se forem diferentes, é só ver se a inicial 
      // é menor que a final.
      hIni = parseInt(horaIni[0], 10);
      hFim = parseInt(horaFim[0], 10);
      if (hIni != hFim)
        return hIni < hFim;

      // Se as horas são iguais, verifica os minutos então.
      mIni = parseInt(horaIni[1], 10);
      mFim = parseInt(horaFim[1], 10);
      if (mIni != mFim)
        return mIni < mFim;
    }

    function somaHora(horaInicio, horaSomada) {

      horaIni = horaInicio.split(':');
      horaSom = horaSomada.split(':');

      horasTotal = parseInt(horaIni[0], 10) + parseInt(horaSom[0], 10);
      minutosTotal = parseInt(horaIni[1], 10) + parseInt(horaSom[1], 10);

      if (minutosTotal >= 60) {
        minutosTotal -= 60;
        horasTotal += 1;
      }

      horaFinal = completaZeroEsquerda(horasTotal) + ":" + completaZeroEsquerda(minutosTotal);
      return horaFinal;
    }

    function completaZeroEsquerda(numero) {
      return (numero < 10 ? "0" + numero : numero);
    }

    if (data.entrada != null && data.saida != null && registros[0].saida != null) {
      var entradaSaida = (diferencaHoras(registros[0].saida, registros[0].entrada))
      var almocoDif = (diferencaHoras(registros[0].saida_almoco, registros[0].retorno_almoco))
      var lancheDif = (diferencaHoras(registros[0].saida_lanche, registros[0].retorno_lanche))
      var pausaDiff = (somaHora(almocoDif, lancheDif));

      var hourTotal = (diferencaHoras(entradaSaida, pausaDiff));
    }
    
    //Validação da primeira inserção.
    
      if (registros[0] == undefined && data.tipo_batida != 'Entrada') {
      return response.status(400).send('É necessário primeiro registrar a entrada.')
    }
 

    //Inserção da batida e atualização da mesma.

    if (registros.some(w => w.created_at == dataAtual)) {
      await connection("registros").update({
        entrada:
          data.entrada != null ? registros[0].entrada : data.entrada,
        saida_almoco:
          registros[0].saida_almoco != null
            ? registros[0].saida_almoco
            : data.saida_almoco,
        retorno_almoco:
          registros[0].retorno_almoco != null
            ? registros[0].retorno_almoco
            : data.retorno_almoco,
        saida_lanche:
          registros[0].saida_lanche != null
            ? registros[0].saida_lanche
            : data.saida_lanche,
        retorno_lanche:
          registros[0].retorno_lanche != null
            ? registros[0].retorno_lanche
            : data.retorno_lanche,
        saida:
          registros[0].saida != null
            ? registros[0].saida
            : data.saida,
        hrs_trabalhadas: hourTotal,
        tipo_batida: data.tipo_batida,
        created_at: data.created_at,
      });
      return response.status(204).send();
    } else {
      //inserção da batida
      const [id] = await connection("registros").insert({
        entrada: data.entrada,
        saida_almoco: data.saida_almoco,
        retorno_almoco: data.retorno_almoco,
        saida_lanche: data.saida_lanche,
        retorno_lanche: data.retorno_lanche,
        saida: data.saida,
        hrs_trabalhadas: data.hrs_trabalhadas,
        tipo_batida: data.tipo_batida,
        created_at: data.created_at,
        funcionarios_id,
      });
      return response.json({ id });
    }
  },
};
