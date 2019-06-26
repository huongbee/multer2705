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

function fileFilter(req, file, cb){
    if(file.mimetype != 'image/gif' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/png'){
        //return cb(null, false);
        return cb(new Error('File not allow!'))
    }
    cb(null, true);
}

const upload = multer({
    storage,
    limits: {
        fileSize: 102400, //100kb
        fieldSize: 204800  //200kb
    }, // 100kB
    fileFilter
})
// const single = upload.single('avatar')

app.get('/upload', (req,res)=>{
    res.render('upload');
})
// app.post('/upload', (req,res)=>{
//     single(req, res, (err)=>{
//         if(err) return res.send({ error: err.message })
//         return res.send({ avatar: req.file });
//     })
// })

// const array = upload.array('avatar', 2)
// app.post('/upload', (req,res)=>{
//     array(req, res, (err)=>{
//         if(err) return res.send({ error: err.message })
//         return res.send({ avatar: req.files });
//     })
// })

const fields = upload.fields([
    { name: 'hinhChinh' },
    { name: 'hinhPhu', 'maxCount': 2 }
]);
app.post('/upload', (req,res)=>{
    fields(req, res, (err)=>{
        if(err) return res.send({ error: err.message })
        const mainImg = req.files.hinhChinh[0]
        const subImgs = req.files.hinhPhu
        return res.send({ mainImg, subImgs })
    })
})

app.listen(3000,()=>console.log('Server start on port 3000'));


