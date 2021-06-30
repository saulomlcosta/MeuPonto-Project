const express = require('express');

const FuncionarioController = require('./controllers/FuncionarioController');
const RegistroController = require('./controllers/RegistroController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

routes.post('/login', LoginController.search);

routes.get('/funcionarios', FuncionarioController.index);
routes.post('/funcionarios/cadastrar', FuncionarioController.create);
routes.get('/funcionarios/relatorios', FuncionarioController.reportUser);

routes.post('/registros/inserir', RegistroController.create);

module.exports = routes;