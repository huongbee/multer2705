const app = require('express')();
app.set('view engine', 'ejs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })

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


