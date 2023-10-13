'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const conversionSchema = schema( 
{
            monto_origen : {
                type: Number,
                required: true
            },
            monto_conversion : {
                type: Number,
                required: true
            },
            fecha_actividad: {
                type: Date,
                require: true
            },
            fecha_conversion: {
                type: Date,
                require: true
            },
            valor_moneda: {
             type: Number,
             require: true
            },
            usuario:[{
                type: schema.ObjectId,
                ref: "usuario"
            }]
}
    
    );
module.exports = mongoose.model('conversion', conversionSchema);