const data = 'hello world'
const crypto = require('crypto')
const db = require(`${__dirname}/database.json`)
const fs = require('fs')
const router = express.Router()

module.exports = data

router.get('/api/random-cat', (req, res) => {
    const cats = fs.readdirSync('./www/images')
    const ran = Math.floor(Math.random()* cats.length)
    res.json({message: `images/${cats[ran]}` })
})

function updateDB (){
    const data = JSON.stringify(db, null, 2)
    fs.writeFile(`${__dirname}/database.json`, data, (err) => {
    if (err) console.log('something went wrong', err)
    else console.log('database was updated!')    
    })
}

router.post('/api/fingerprint', (req, res) => {
    const md5 = crypto.createHash('md5')
    const str = JSON.stringify(req.body)
    const bfp = md5.update(str, 'utf8').digest('hex')
    console.log(bfp)

    if (db.hasOwnProperty(bfp)){
        db[bfp].push(Date.now())
    }else {
        db[bfp] = [Date.now()]
    }

    updateDB()

    res.json({message: 'got it!' })
})