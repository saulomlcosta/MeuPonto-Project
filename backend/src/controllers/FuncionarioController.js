const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const funcionarios = await connection("funcionarios").select("*");

    return response.json(funcionarios);
  },

  async create(request, response) {
    const { nome, cpf, email, whatsapp, cidade, uf } = request.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("funcionarios").insert({
      id,
      nome,
      cpf,
      email,
      whatsapp,
      cidade,
      uf,
    });

    return response.json({ id });
  },

  async reportUser(request, response) {
    const id = request.headers.authorization;
    const registrosFuncionario = await connection("registros")
      .where("funcionarios_id", id)
      .select(["registros.*"]);
    return response.json(registrosFuncionario);
  }
};
