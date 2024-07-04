import express from "express";
import mongoose from "mongoose";
import { Schema } from "mongoose";
import ejs, { render } from "ejs";

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

//middleware
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//base de datos
mongoose.connect('mongodb://127.0.0.1:27017/Users');

    //schema
    const userSchema = new Schema({
        name:String,
        lastName:String,
        age:Number,
    });

    //model
    const User = mongoose.model('User',userSchema)

// Rutas

app.get('/',(req,res)=>{
    res.render('index')
});
//usuario es el formulario
app.get('/usuarios',(req,res)=>{
    res.render('usuarios')
});

//la ruta usuarios es el formulario que envia a la ruta ingresar
app.post('/ingresar',(req,res)=>{
    const datos =  req.body
    if(datos.nombre && datos.apellido && datos.edad){
        User.create({
            name:datos.nombre,
            lastName:datos.apellido,
            age:datos.edad
        })
    }else{
        console.log('error')
    }
    res.render('usuarios')
});

//mostrar
app.get('/viewUser', async(req,res)=>{
    try{
        const data = await User.find({});
        res.render('viewUser',{data:data})
    }catch(err){
        console.error(err)
        res.send('no se pudo')
    }
});

app.get('/delete/viewUser', async (req,res)=>{
    const data = await User.find({});
    res.render('viewUser',{data:data})
})

//eliminar

app.post('/delete/:id', async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.render('viewUser');
});
//servidor
app.listen(3000,()=>{
    console.log('el servidor esta activo')
});