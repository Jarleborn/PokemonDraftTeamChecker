const colors = require('colors')
const express = require('express')
const http = require('http').Server(app)
const port = 1337
let app = express()
import {getInitialData, test} from './modules/teamChecker'
console.log('hej'.green)

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/checkTeam', function (req, res) {
  getInitialData(['smeargle'])
})

app.get('/test', function (req, res) {
  test(['gengar','bisharp', 'hitmonlee', 'roserade', 'masquerain'])
  .then(resp => res.send(resp))
  .catch(err => console.log(err))
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port)
})
