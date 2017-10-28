const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()

function getPreEvo(finalEvo) {
  return new Promise(function(resolve, reject) {
    P.getPokemonSpeciesByName(finalEvo)
    .then(res => resolve(res.evolves_from_species))
  })
}

function getAllPreEvos(finalEvo) {
  return new Promise(function(resolve, reject) {
    let evos = []
    evos.push(finalEvo)
    getPreEvo(finalEvo)
    .then(res => {
      if (res) {
        evos.push(res.name)
        getPreEvo(res.name)
        .then(res =>{
          if (res) {
            evos.push(res.name)
            resolve(evos)
          } else {
            resolve(evos)
          }
        })
      } else {
        resolve(evos)
      }
    })
    .catch(err=> console.log(err))
  })
}

function getMovesForEvoline(finalEvo) {
  return new Promise(function(resolve, reject) {
    let moves = {}
    moves.name = finalEvo
    moves.moves = []
    let hold = []
    hold.push(getAllPreEvos(finalEvo)
    .catch(err => console.log(err))
    .then(evoLine => {
      return new Promise(function(resolve, reject) {
        for (var i = 0; i < evoLine.length; i++) {
          P.getPokemonByName(evoLine[i])
          .then(res => {
            console.log(res.name)
            moves.moves.push(res.moves)
          })
          .catch(err => console.log(err))
        }
        resolve(moves)
      })
    }))
    return Promise.all(hold)
    .then(res => {
      resolve(moves)
    })
    .catch(err => reject(err))

  })
}

export {getMovesForEvoline}
