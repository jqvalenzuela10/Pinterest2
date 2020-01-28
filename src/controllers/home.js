const ctrl={}


const {Image}=require('../models')
const {User}=require('../models')

ctrl.indexPost=async(req,res)=>{
    const user=new User({
        nombre:'juan',
        apellido:'perez',
        user:'tresdiez',
        password:'123'
    })
    if(user.nombre==='juan'){
        res.redirect('/')
    }
    else{
        res.send('error al entrar al login')
    }
    
}


ctrl.formulario=(req,res)=>{
    
    res.render('formulario',{layout:null})
}

ctrl.index=async(req,res)=>{
    const images=await Image.find().sort({timestamp:1}) 
    
    console.log(images)
    res.render('index',{images})                 
}


module.exports=ctrl