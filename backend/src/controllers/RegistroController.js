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

    var registroAtual = registros.filter(w => w.created_at == dataAtual)

    if (registroAtual.length <= 0 && data.tipo_batida != 'Entrada') {
      return response.status(400).send('É necessário primeiro registrar a entrada.')
    }
   

    if (registros.some(w => w.created_at == dataAtual)) {
      //Validações para evitar que o mesmo registro seja sobreescrevido na tabela, e evitando ter mais de uma entrada.
      await connection("registros").update({
        saida_almoco:
          data.tipo_batida == "Inicio de almoço"
            ? data.saida_almoco
            : registroAtual.saida_almoco,
        retorno_almoco:
          data.tipo_batida == "Retorno de almoço"
            ? data.retorno_almoco
            : registroAtual.retorno_almoco,
        saida_lanche:
          data.tipo_batida == "Inicio de lanche"
            ? data.saida_lanche
            : registroAtual.saida_lanche,
        retorno_lanche:
          data.tipo_batida == "Retorno de lanche"
            ? data.retorno_lanche
            : registroAtual.retorno_lanche,
        saida: data.tipo_batida == "Saída" ? data.saida : registroAtual.saida,
        hrs_trabalhadas: data.hrs_trabalhadas,
        tipo_batida: data.tipo_batida,
        created_at: data.created_at,
      });
      return response.status(204).send();
    } else {      
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
