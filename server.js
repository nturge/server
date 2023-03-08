const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const path = require('path')
// const restAPI = require(path.join(__dirname, './my_modules/rest_api.js'))
const restAPI = require('./my_modules/rest_api.js')


app.use(bodyParser.json())
app.use(restAPI)
app.use(express.static('www'))
app.get('/', (req, res) =>  {
    res.sendFile(`${__dirname}/www/index.html`)
})

app.listen(port, (err) => {
    if(err)return console.log(err)
    console.log(`
    Listening on http://localhost:${port}
    Document root is ${__dirname}
    Press Ctrl-C to quit.`)
}) 