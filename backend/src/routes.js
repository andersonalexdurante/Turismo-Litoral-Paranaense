const express = require('express');
const routes = express.Router();

const LocalController = require('./controllers/LocalController')

routes.get('/locais', LocalController.index);
routes.post('/locais', LocalController.create)
routes.delete('/locais/:id', LocalController.delete)

module.exports = routes;