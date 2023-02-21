const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const crypto = require('crypto')
const fs = require('fs')
const db = require('./database.json')
const port = 8000

app.use(bodyParser.json())
 
app.get('/', (req, res) =>  {
    res.sendFile(`${__dirname}/www/index.html`)
})

function updateDB (){
    const data = JSON.stringify(db)
    fs.writeFile('./database.json', data, () =>{
    if (err) console.log('something went wrong', err)
    else console.log('database was updated!')    
    })
}

app.post('/api/fingerprint', (req, res) => {
    const md5 = crypto.createHash('md5')
    const str = JSON.stringify(req.body)
    const bfp = md5.update(str, 'utf8').digest('hex')
    console.log(bfp)

    if (db.hasOwnProperty(bfp)){
        db[bfp].push(Date.now())
    }else {
        db[bfp]= [Date.now()]
    }

    updateDB()

    res.json({message: 'got it!' })
})
app.listen(port, (err) => {
    if(err)return console.log(err)
    console.log(`
    Listening on http://localhost:${port}
    Document root is ${__dirname}
    Press Ctrl-C to quit.`)
}) 