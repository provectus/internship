const express = require('express')
const app = express()
const hostname = process.env.HOST;

app.get('/', (req, res) => res.send(`Hello ${hostname}!`))
app.listen(3000, () => console.log('Server ready'))