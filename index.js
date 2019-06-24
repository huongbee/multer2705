const app = require('express')();
app.set('view engine', 'ejs');

app.get('/upload', (req,res)=>{
    res.render('upload');
})
app.post('/upload', (req,res)=>{
    
})

app.listen(3000,()=>console.log('Server start on port 3000'));


