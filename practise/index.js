require('dotenv').config()

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us '); 
});

app.get('/twitter', (req, res) => {
  res.send(' <h1>Twitter</h1> <p>Twitter is a social media platform</p>'); 
});

app.listen(process.env.PORT, () => {
 console.log(`Server is running on port ${PORT}`);  
});