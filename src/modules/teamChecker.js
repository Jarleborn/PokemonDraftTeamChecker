const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()
import {toxicSpikesMons, stickyWebMon, rocksMon, spikesMon, rapidSpinMons, defogMons} from './extra'

// function getInitialData(array){
//   for (var i = 0; i < array.length; i++) {
//     P.getPokemonByName(array[i]) // with Promise
//     .then(function(response) {
//       console.log(response[0])
//     })
//     .catch(function(error) {
//       console.log('There was an ERROR: ', error)
//     })
//
//   }
// }


function test(mons) {
  let hold = []
  return new Promise(function(resolve, reject) {
    let team = {}
    team.mons = []
    team.hazards = []
    team.removal = []
    team.voltTurn = []


    for (var i = 0; i < mons.length; i++) {
      hold.push(P.getPokemonByName(mons[i]) // with Promise
      .then(mon =>
        monChecker(mon)
      )
      .catch(function(error) {
        console.log('There was an ERROR: ', error)
      })
    )
    }
    return Promise.all(hold)
    .then(res=> {
      resolve(res)
    })
  })

}


function monChecker(monToCheck) {
  return new Promise(function(resolve, reject) {
    let mon = {}
    mon.name = monToCheck.name
    mon.type = monToCheck.types
    mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/'+monToCheck.name+'.gif'
    mon.hazards = []
    mon.removal = []
    mon.voltTurn = []
    console.log(mon.sprite)
    const voltTurn = ['volt-switch', 'u-turn']



    for (var j = 0; j < monToCheck.types.length; j++) {

    }
    for (var i = 0; i < monToCheck.moves.length; i++) {

      if (voltTurn.includes(monToCheck.moves[i].move.name)) {
        mon.voltTurn.push({
          'type':monToCheck.moves[i].move.name,
          'mon':monToCheck.name,
        })
      }

    }
    if ( toxicSpikesMons.includes(monToCheck.name)) {
      mon.hazards.push({
        'type':'toxic-spikes',
        'mon':monToCheck.name,
      })
    }
    if ( stickyWebMon.includes(monToCheck.name)) {
      mon.hazards.push({
        'type':'sticky-web',
        'mon':monToCheck.name,
      })
    }
    if ( rocksMon.includes(monToCheck.name)) {
      mon.hazards.push({
        'type':'stealth-rock',
        'mon':monToCheck.name,
      })
    }

    if ( spikesMon.includes(monToCheck.name)) {
      mon.hazards.push({
        'type':'spikes',
        'mon':monToCheck.name,
      })
    }

    if ( defogMons.includes(monToCheck.name)) {
      mon.removal.push({
        'type':'defog',
        'mon':monToCheck.name,
      })
    }

    if ( rapidSpinMons.includes(monToCheck.name)) {
      mon.removal.push({
        'type':'rapid-spin',
        'mon':monToCheck.name,
      })
    }

    resolve(mon)
  })
}

export {test}
