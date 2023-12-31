const Conversion = require("../models/conversion");
const axios = require("axios");

const insert = (req, res) => {
    let conversion = new Conversion();
    conversion.valor_moneda = req.body.valor_moneda;
    conversion.monto_origen = req.body.monto_origen;
    conversion.monto_conversion = req.body.monto_conversion;
    conversion.fecha_actividad = req.body.fecha_actividad;
    conversion.fecha_conversion = req.body.fecha_conversion;
    conversion.usuario = req.body.usuario;
    conversion
      .save()
      .then((conversionNueva) => {
        res.status(200).send({ conversionNueva });
      })
      .catch((err) => {
        res.status(500).send({ mensaje: "error al insert conversion:" + err });
      });
  };
  

let historialConversion = async (req, res) => {
  try {
    const conversiones = await Conversion.find().populate("usuario").exec();
    res.status(200).json(conversiones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el historial de conversiones" });
  }
};

/*const exportarExcel = async (req, res) => {
  try {
    const conversiones = await Conversion.find().exec();

    if (conversiones.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay registros para exportar" });
    }

    const csvWriter = createCsvWriter({
      path: "historial_conversiones.csv",
      header: [
        { id: "usuario", title: "Usuario" },
        { id: "monto_origen", title: "Monto Origen" },
        { id: "monto_conversion", title: "Monto Conversión" },
        { id: "fecha_actividad", title: "Fecha de Actividad" },
        { id: "fecha_conversion", title: "Fecha de Conversión" },
        { id: "valor_moneda", title: "Valor de la Moneda" },
      ],
    });

    const records = conversiones.map(conversion => ({
      usuario: conversion.usuario,
      monto_origen: conversion.monto_origen,
      monto_conversion: conversion.monto_conversion,
      fecha_actividad: conversion.fecha_actividad,
      fecha_conversion: conversion.fecha_conversion,
      valor_moneda: conversion.valor_moneda
    }));

    csvWriter.writeRecords(records).then(() => {
      res
        .status(200)
        .json({ message: "Historial de conversiones exportado a CSV" });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al exportar el historial de conversiones" });
  }
};*/


module.exports = { insert, historialConversion};
