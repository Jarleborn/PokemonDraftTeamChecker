const colors = require('colors')
const express = require('express')
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 1338
let app = express()
import {getInitialData, test} from './modules/teamChecker'
import {writeToFile}from './modules/writeToJson'
console.log('hej'.green)

const fs = require('fs')

let file = require('./data.json')

const jsonParser = bodyParser.json()
// app.use(bodyParser.json({ type: 'application/*+json' }))
test(['donphan', 'roserade'])
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


app.post('/getMons', jsonParser, function (req, res) {
  test(req.body.mons)
  .then(resp => {
    for (var i = 0; i < resp.length; i++) {
      file.mons.push(resp[i].name)
    }
    file.mons.push('-------------------------------')
    res.send(resp)
  })
  .catch(err => {
    console.log(err)
    res.send(JSON.stringify({'error':err}))
  })
})

app.get('/admin', function (req, res) {
  res.send(file)
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port)
})
