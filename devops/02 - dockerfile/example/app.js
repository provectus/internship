#!/usr/bin/node
const express = require('express')
const app = express()
const hostname = process.env.HOST;
const port = process.env.PORT;

app.get('/', (req, res) => res.send(`Hello ${hostname}!`))
app.listen(port, () => console.log('Server ready'))