const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) =>  {
    res.sendFile(`${__dirname}/www/index.html`)
})
app.listen(port, (err) =>{
    if(err)return console.log(err)
    console.log(`
    Listening on http://localhost:${port}
    Document root is ${__dirname}
    Press Ctrl-C to quit.`)
}) 