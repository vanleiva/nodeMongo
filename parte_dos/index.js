const mongoose = require('mongoose');

main().then(() =>{
    console.log('conectado a mongo')
}).catch(err=>console.log(err))


//funcion para conectarse a la base de datos
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/usuarios');
}

//schema
const usuarioSchema = new mongoose.Schema({
    idUsua: Number,
    nombre: String,
    apellido:String,
    edad: Number,
    
});

//modelo
const Usuario = mongoose.model('usuario',usuarioSchema)

//insertar

const usuario1 = new Usuario({
    idUsua:0,
    nombre:'omar',
    apellido:'martines',
    edad:50
});
const usuario2 = new Usuario({
    idUsua:1,
    nombre:'francisco',
    apellido:'paredes',
    edad:20
});const usuario3 = new Usuario({
    idUsua:3,
    nombre:'noel',
    apellido:'real',
    edad:22
});
usuario1.save();
usuario2.save();
usuario3.save();

//buscar

Usuario.find({nombre:'omar'}).exec();

//eliminar

Usuario.deleteOne({apellido:'real'});

//actualizar

Usuario.updateOne({nombre:'omar'},{nombre:'george'})
