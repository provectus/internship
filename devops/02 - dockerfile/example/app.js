const express = require('express')
const fs = require('fs');

const app = express()
const hostname = process.env.HOST;

function readLogs(path) {
    return fs.readFileSync(path, 'utf8').replace(/(?:\n)/g, '<br>')
}

app.get('/', (req, res) => res.send(`Hello ${hostname}!`))
app.get('/logs/supervisord', (req, res) => res.send(readLogs('supervisord.log')))
app.get('/logs/app', (req, res) => res.send(readLogs('app.log')))
app.listen(3000, () => console.log('Server ready'))
