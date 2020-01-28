const mongoose=require('mongoose')
const{Schema}=mongoose

const user =new Schema({

    nombre:{type:String},
    apellido:{type:String},
    user:{type:String},
    password:{type:String}

})




console.log(user)

module.exports=mongoose.model('User',user)