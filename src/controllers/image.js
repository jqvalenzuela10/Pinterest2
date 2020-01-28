const ctrl = {}
const { randomNumber } = require('../helpers/libs')
const path = require('path')
const fs = require('fs-extra')
const { Comentario,Image,User  } = require('../models')
const md5=require('md5')
ctrl.index = async(req, res) => {
    const img=await Image.findOne({filename:{$regex:req.params.image_id}})
    const comment=await Comentario.find({image_id:img._id})
    
    res.render('image',{img,comment})
}



ctrl.create =  (req, res) => {
    const saveImage = async() => {
        const imageUrl = randomNumber()
        const images = await Image.find({ filename: imageUrl })
        if (images.lenght > 0) {
            saveImage()
        }
        else {
            console.log(imageUrl)
            const imageTemPath = req.file.path
            const ext = path.extname(req.file.originalname).toLowerCase()
            const targetPath = path.resolve('src/public/upload/' + imageUrl + '' + ext)

            if (ext === '.png' || ext === '.jpg' || ext == '.jpeg' || ext == '.gif') {
                await fs.rename(imageTemPath, targetPath)
                const newImg = new Image({
                    title: req.body.title,
                    filename: imageUrl + ext,
                    description: req.body.description

                })
                const imageSaved = await newImg.save()
                res.redirect('/')
            }
            else {
                await fs.unlink(imageTemPath)
                res.status(500).json({ error: 'solo imagenes estan permitidas' })
            }
           
        }
    }
    saveImage()
}

ctrl.like = (req, res) => { 
    res.send('se creo  el like')
}

ctrl.comment =async (req, res) => {

   const image=await Image.findOne({filename:{$regex:req.params.image_id}})
    if(image){
        const newComment=new Comentario(req.body)
        newComment.gravatar=md5(newComment.email)
        newComment.image_id=image._id
        await newComment.save()
        console.log(newComment)
            
    res.redirect('/images/'+image.uniqueId)
    }



}


module.exports = ctrl