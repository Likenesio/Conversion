'use strict'
const express = require('express');
require('dotenv').config();
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
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT
//const db_name = process.env.DB_NAME;
const port = process.env.PORT;
//mongodb://mongo:G8s0ng0RWSxZakYIWwRs@containers-us-west-185.railway.app:7145
mongoose.connect(`mongodb://${db_host}:${db_port}`, options)
.then(() => console.log('> Successfully connected to DB')).catch(err => console.log(err))

app.listen(port, () => {

    console.log('> Servicio corriendo en puerto ' + port)
})



module.exports = app;