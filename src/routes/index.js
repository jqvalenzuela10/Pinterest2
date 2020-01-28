const exprees=require('express')
const router=exprees.Router()

const home=require('../controllers/home')
const image=require('../controllers/image')

module.exports=app=>{

router.get('/',home.index)
router.post('/',home.indexPost)
router.get('/images/:image_id',image.index)
router.get('/formulario',home.formulario)


router.post('/images',image.create)
router.post('/images/:image_id/like',image.like)
router.post('/images/:image_id/comment',image.comment)



app.use(router)
}