const app = require('express')();
app.set('view engine', 'ejs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/image/')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })
const single = upload.single('avatar')

app.get('/upload', (req,res)=>{
    res.render('upload');
})
app.post('/upload', single, (req,res)=>{
    const avatar = req.file;
    const name = req.body.txtName
    res.send({ avatar, name })
})

app.listen(3000,()=>console.log('Server start on port 3000'));


