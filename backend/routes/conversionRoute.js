'use strict'

var express = require('express');
var conversionController = require('../controllers/conversionController');
var api = express.Router();

api.post('/conversion',conversionController.insert);
api.get('/conversiones',conversionController.historialConversion);
api.get('/conversiones/export',conversionController.exportarExcel);

module.exports = api;