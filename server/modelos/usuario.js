// modelo de datos 
const mongoose = require('mongoose');
const uniqueValidaitor = require('mongoose-unique-validator');
let rolesValidos = {
    values: ['USER_ROL', 'ADMIN_ROL'],
    message: '{VALUE} no es un rol válido'
};
let Shema = mongoose.Schema;
// definir nuestro esquema 

let usuarioShema = new Shema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario '],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario ']

    },
    pasword: {
        type: String,
        required: [true, 'la contraseña  es necesario ']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, ' el rol  es necesario '],
        enum: rolesValidos
    },

    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
usuarioShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pasword;
    return userObject;
}


usuarioShema.plugin(uniqueValidaitor, {
    message: '{PATH} debe de ser unico '
})
module.exports = mongoose.model('Usuario', usuarioShema)