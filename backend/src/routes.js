const express = require('express');
const routes = express.Router();

const LocalController = require('./controllers/LocalController')

routes.get('/locais', LocalController.index);
routes.post('/locais', LocalController.create)
routes.delete('/locais/:id', LocalController.delete)
routes.get('/destaques', LocalController.destaques)
routes.get('/trending', LocalController.trending)
routes.get('/favoritos', LocalController.favoritos)
routes.put('/favoritos/:id', LocalController.alteraFavorito)
routes.get('/sugestoes', LocalController.sugestoes)

module.exports = routes;