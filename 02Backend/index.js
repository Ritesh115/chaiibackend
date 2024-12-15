import express from "express"; 
// const express = require('express')

const app = express();


app.get('/' , (req , res) => {
   res.send('hello request listen succesfully')
})

app.get('/login' , (req , res) => {
   const jokes = [
      {
        "id": 1,
        "username": "john_doe",
        "email": "john.doe@example.com",
        "age": 28,
        "gender": "male",
        "isActive": true
      },
      {
        "id": 2,
        "username": "jane_smith",
        "email": "jane.smith@example.com",
        "age": 34,
        "gender": "female",
        "isActive": true
      },
      {
        "id": 3,
        "username": "sam_brown",
        "email": "sam.brown@example.com",
        "age": 23,
        "gender": "male",
        "isActive": false
      },
      {
        "id": 4,
        "username": "lisa_jones",
        "email": "lisa.jones@example.com",
        "age": 29,
        "gender": "female",
        "isActive": true
      }
    ]
   res.send(jokes)
})

 

const port = 5000

app.listen(port , ()=>{
   console.log(`listning at port ${port}`);
})


