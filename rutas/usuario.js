const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../server/modelos/usuario')
const app = express();
const bodyParser = require('body-parser');
// necesario para el metodo post 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    // sacar 
app.get('/usuario', (req, res) => {
        let desde = req.query.desde || 0;
        desde = Number(desde);
        let limite = req.query.limite || 5;
        limite = Number(limite)
        Usuario.find({}, "nombre email role estado google img")
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                Usuario.count({}, (err, conteo) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        })
                    }
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    })
                })

            })

    })
    // insertar
app.post('/usuario', (req, res) => {
        let body = req.body;
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            pasword: bcrypt.hashSync(body.pasword, 10),
            role: body.role
        });
        // grabar en la base de datos 
        usuario.save((err, usuariodb) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                usuario: usuariodb
            })
        })
    })
    // actualizar 
app.put('/usuario/:id', (req, res) => {
        let id = req.params.id;
        let body = _.pick(req.body, [
            'nombre',
            'email',
            'img',
            'role',
            'estado'
        ]);

        Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuariodb) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                usuario: usuariodb
            })
        })
    })
    //   eliminar 
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usarioborrado) =>
    let cambiaestado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaestado, { new: true, runValidators: true }, (err, usua) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (usua === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado '
                }
            })
        }
        res.json({
            ok: true,
            usario: usua
        })
    })
})
module.exports = app;