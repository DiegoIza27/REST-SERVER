require('../config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// pedimos aqui las rutas de los usuarios 
app.use(require('../rutas/usuario'));
// escuchadno  express en el puerto 
app.listen(process.env.PORT || 3000, () => {
        console.log('escuchando el en puerto ', process.env.PORT || 3000);
    })
    //  conectar a la base de datos de mongo DB
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})