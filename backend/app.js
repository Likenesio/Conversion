'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(cors());
app.options('*', cors())

var usuario_route = require('./routes/usuarioRoute');
var conversion_route = require('./routes/conversionRoute');


const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api', usuario_route);
app.use('/api', conversion_route);


const options = {
    useNewUrlParser: true,
    autoIndex: true, //this is the code I added that solved it all
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
}
const db_host = "127.0.0.1";
const db_port = "27017"
const db_name = "prueba";
const port = "3000";

mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`, options)
.then(() => console.log('> Successfully connected to DB')).catch(err => console.log(err))

app.listen(port, () => {

    console.log('> Servicio corriendo en puerto ' + port)
})



module.exports = app;