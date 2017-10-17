const colors = require('colors')
const express = require('express')
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const port = 1337
let app = express()
import {getInitialData, test} from './modules/teamChecker'
console.log('hej'.green)

const jsonParser = bodyParser.json()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/checkTeam', function (req, res) {
  getInitialData(['smeargle'])
})

app.post('/test', jsonParser, function (req, res) {
  console.log(req.body)
  test(['zygarde',
    'hawlucha',
    'chandelure',
    'roserade',
    'mesprit',
    'rhydon',
    'aggron-mega',
    'galvantula',
    'sneasel',
    'donphan',
    'togekiss',
    'bibarel',
  ])
  .then(resp => res.send(resp))
  .catch(err => console.log(err))
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port)
})
