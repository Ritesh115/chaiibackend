require('dotenv').config();
const Path = require('path');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', Path.resolve("./views"));

app.get('/'  , (req , res)=>{
    return res.render('homepage')
})


app.use(express.urlencoded({ extended: true }));
app.get('/upload' ,  (req , res)=>{
   
})


app.listen(process.env.PORT, () => {
  console.log(` app listening on port ${PORT}`)
})



