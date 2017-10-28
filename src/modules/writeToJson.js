const jsonfile = require('jsonfile')
const file = '/tmp/data.json'

function writeToFile(obj) {
  jsonfile.readFile(file, function(err, obj) {
    console.dir(obj)
  })
  console.log(file)
  jsonfile.writeFile(file, obj, {flag: 'a'}, function (err) {
    console.error('err')
  })
}

export {writeToFile}
