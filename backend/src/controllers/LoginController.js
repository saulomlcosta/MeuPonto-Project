const connection = require("../database/connection");

module.exports = {

  async search(request, response) {
    const { id } = request.body;
    const funcionario = await connection("funcionarios")
      .where("id", id)
      .select("nome")
      .first();
    if (!funcionario) {
      return response
        .status(400)
        .json({ error: "Nenhum funcionário encontrado com esse ID" });
    }
    return response.json(funcionario);
  }
}