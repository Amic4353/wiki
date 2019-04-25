const express = require('express')
const wikiRouter = express.Router()
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')

wikiRouter.get('/', (req, res, next) => {
    res.send('got to get wiki')
})

wikiRouter.post('/', (req, res, next)  => {
    res.send('Got to post wiki')
})

wikiRouter.get('/add', (req, res, next) => {
    res.send(addPage())
})

module.exports = wikiRouter
