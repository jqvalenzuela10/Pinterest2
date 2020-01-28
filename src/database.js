/*aqui nos conectamos a la base de datos */

const mongoose=require('mongoose')
const {database}=require('./key')

mongoose.connect(database.URI,{useNewUrlParser:true,useUnifiedTopology: true})
.then(db=>console.log('db is connect')).catch(err=>console.log(err))