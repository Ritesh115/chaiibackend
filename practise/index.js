require('dotenv').config();
const express = require('express');


const app = express();

const PORT = 3000;


app.get('/'  , (req , res)=>{
    res.send("hello world");
})

app.get('/login' , (req , res)=>{
  res.send("login done")
})

app.get('/about' , (req , res)=>{
   res.send('Ritesh');
})

app.listen(process.env.PORT, () => {
  console.log(` app listening on port ${PORT}`)
})



