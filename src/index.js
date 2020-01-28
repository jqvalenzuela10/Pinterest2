const express=new require('express')
const config =  require('./server/config')

require('./database')
const app=config(express())
/*escuchar puerto */
const port=app.get('port')




app.listen(port,()=>{
    console.log(port)
})
