
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const PORT = 3000
const { db } = require('./models')
const models = require('./models')
const wikiRouter = require('./router/wiki')
const userRouter = require('./router/user')



app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"))

app.use(bodyParser.json())
app.use('/wiki', wikiRouter)
app.get('/', (req, res) => {
    res.redirect('/wiki')
})
const init = async () => {
   //this drops all tables then recreates them based on our JS definitions
   models.db.sync({force: true})

    app.listen(PORT , () => {
        console.log(`listening ${PORT}`)
    })
}

db.authenticate().then(() => {
    console.log('connected to database')
})
init()


