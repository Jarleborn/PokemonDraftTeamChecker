const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()
import {fakeOutMons, eSpeedMons, feintMons, fiMons, aRockMons, aquaJetMonst, bulletPunchMons, iceShardMons, machPunchMons, quickAttackMons, shadowSneakMons, suckerPunchMons, vacuumWaveMons, waterShurikanMons, toxicSpikesMons, stickyWebMon, rocksMon, spikesMon, rapidSpinMons, defogMons, types } from './extra'
import {getMovesForEvoline} from './moveGetter'


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
        console.log(error.message)
        // console.log(error.options.url.substr(33,1000))
        reject('there where some problem with ' + error.options.url.substr(33,1000) + ' maybe you spelled it wrong. or it could be '+ error.message )
      })
    )
    }
    return Promise.all(hold)
  .then(res=> {
    // console.log(res)
    resolve(res)
  })
  .catch(err => resolve(err))
  })

}


function monChecker(monToCheck) {

  return new Promise(function(resolve, reject) {
    let mon = {}

    if (monToCheck.name === 'darmanitan-standard') {
      mon.name = 'darmanitan'
    } else if (monToCheck.name === 'meowstic-male') {
      mon.name = 'meowstic'
    } else if( monToCheck.name === 'gourgeist-average'){
      mon.name = 'gourgeist'
    }else if (monToCheck.name === 'keldeo-ordinary'){
      mon.name = 'keldeo'
    }else if(monToCheck.name === 'meloetta-aria'){
      mon.name = 'meloetta'
    }else if(monToCheck.name === 'mimikyu-disguised'){
      mon.name = 'mimikyu'
    }else if(monToCheck.name === 'wishiwashi-schoold'){
      mon.name = 'wishiwashi'
    }else {
      mon.name = monToCheck.name
    }
    mon.type = monToCheck.types
    if (mon.name === 'thundurus-incarnate') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/thundurus.gif'
    }else if (mon.name === 'tornadus-incarnate') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/tornadus.gif'
    }else if (mon.name === 'landorus-incarnate') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/landorus.gif'
    }else if (mon.name === 'shaymin-land') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/shaymin.gif'
    } else if (mon.name === 'meowstic-male') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/meowstic.gif'
    } else if (mon.name === 'tapu-fini') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/tapufini.gif'
    } else if (mon.name === 'tapu-koko') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/tapukoko.gif'
    } else if (mon.name === 'tapu-bulu') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/tapubulu.gif'
    } else if (mon.name === 'tapu-lele') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/tapulele.gif'
    }else if (mon.name === 'zygarde-50') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/zygarde.gif'
    } else if (mon.name === 'charizard-mega-x') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/charizard-megax.gif'
    } else if (mon.name === 'charizard-mega-y') {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/charizard-megay.gif'
    } else {
      mon.sprite = 'http://play.pokemonshowdown.com/sprites/xyani/'+mon.name+'.gif'
    }
    mon.hazards = []
    mon.removal = []
    mon.voltTurn = []
    mon.moves = monToCheck.moves
    mon.abilities = []
    mon.priority = []
    mon.stats = monToCheck.stats

    for (var i = 0; i < monToCheck.abilities.length; i++) {
      mon.abilities.push(monToCheck.abilities[i].ability.name)
    }

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
    if ( fakeOutMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'fake-out',
        'mon':monToCheck.name,
      })
    }
    if ( eSpeedMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'extreme-speed',
        'mon':monToCheck.name,
      })
    }

    if ( feintMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'feint',
        'mon':monToCheck.name,
      })
    }

    if ( fiMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'first-impression',
        'mon':monToCheck.name,
      })
    }

    if ( aRockMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'accelerock',
        'mon':monToCheck.name,
      })
    }
    if ( aquaJetMonst.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'aqua-jet',
        'mon':monToCheck.name,
      })
    }

    if ( bulletPunchMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'bullet-punch',
        'mon':monToCheck.name,
      })
    }

    if ( iceShardMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'ice-shard',
        'mon':monToCheck.name,
      })
    }

    if ( quickAttackMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'quick-attack',
        'mon':monToCheck.name,
      })
    }

    if ( shadowSneakMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'shadow-sneak',
        'mon':monToCheck.name,
      })
    }

    if ( suckerPunchMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'sucker-punch',
        'mon':monToCheck.name,
      })
    }

    if ( vacuumWaveMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'vacuum-wave',
        'mon':monToCheck.name,
      })
    }

    if (machPunchMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'mach-punch',
        'mon':monToCheck.name,
      })
    }

    if ( waterShurikanMons.includes(monToCheck.name)) {
      mon.priority.push({
        'type':'water-shuriken',
        'mon':monToCheck.name,
      })
    }


    console.log(mon)
    resolve(mon)
  })
}

export {test}
