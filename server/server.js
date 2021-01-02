 require('../config/config')
 const express = require('express');
 const app = express();
 // une la petcion con un archivo .json
 const bodyParser = require('body-parser');

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))

 // parse application/json
 app.use(bodyParser.json())

 // sacar 
 app.get('/usuario', (req, res) => {
         res.json("get usuario ")
     })
     // insertar
 app.post('/usuario', (req, res) => {
         let body = req.body;
         if (body.nombre === undefined) {
             res.status(400).json({
                 ok: false,
                 mensaje: "El nombre es necesario"
             })
         } else {

             res.json({
                 persona: body
             })
         }
     })
     // actualizar 
 app.put('/usuario/:id', (req, res) => {
     let id = req.params.id
     res.json({
         id
     })
 })
 app.delete('/usuario', (req, res) => {
     res.json("delete usuario ")
 })
 app.listen((process.env.PORT || 3000), () => {
     console.log('escuando el en puerto ', process.env.PORT || 3000);
 })