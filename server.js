const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

app.get('/', (req, res) =>  {
    res.sendFile(`${__dirname}/www/index.html`)
})

app.post('/api/fingerprint', (req, res) => {
    console.log(req.body)
})
app.listen(port, (err) => {
    if(err)return console.log(err)
    console.log(`
    Listening on http://localhost:${port}
    Document root is ${__dirname}
    Press Ctrl-C to quit.`)
}) 