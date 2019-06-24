const app = require('express')();
app.set('view engine', 'ejs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images/')
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
app.post('/upload', (req,res)=>{
    single(req, res, (err)=>{
        if(err) return res.send({ error: err.message })
        return res.send({ avatar: req.file });
    })
})

app.listen(3000,()=>console.log('Server start on port 3000'));


