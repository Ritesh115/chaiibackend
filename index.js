require('dotenv').config()

const express = require('express')

const app = express()


const port = 3000


const gitdata = {
  "id": 101,
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "age": 28,
  "gender": "male",
  "address": {
    "street": "123 Main Street",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701",
    "country": "USA"
  },
  "preferences": {
    "language": "en",
    "theme": "dark",
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    }
  },
  "isActive": true,
  "createdAt": "2023-12-14T10:00:00Z",
  "roles": ["user", "admin"]
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req,res) => {
   res.send('<h1>hello i am back</h1>')
})

app.get('/login', (req,res) => {
  res.send('hello login completed')
})


app.get('/github', (req,res) => {
  res.json(gitdata)
})





app.listen(process.env.PORT , () => {
  console.log(`Example app listening on port ${port}`)
})
