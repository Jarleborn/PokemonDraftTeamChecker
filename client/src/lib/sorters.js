import types from './types'

function sortOutHazards(data){
  return new Promise(function(resolve, reject) {
    if (!data) {
      reject('error in hazards')
    }
    let hazards = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].hazards.length > 0) {
        for (var j = 0; j < data[i].hazards.length; j++) {
          hazards.push(data[i].hazards[j])
        }
      }
    }
    resolve(hazards)
  })
}
function sortOutStats(data){
  for (var i = 0; i < data.length; i++) {
    data[i].speed = data[i].stats[0].base_stat
    data[i].spdef = data[i].stats[1].base_stat
    data[i].spatk = data[i].stats[2].base_stat
    data[i].def = data[i].stats[3].base_stat
    data[i].atk = data[i].stats[4].base_stat
    data[i].hp = data[i].stats[5].base_stat
  }
}
function sortOutAbilities(data){
  let abilities = []
  return new Promise(function(resolve, reject) {
    if (!data) {
      reject('error in abilities')
    }

    let tmp = {}
    for (var i = 0; i < data.length; i++) {
      tmp.name = data[i].name
      tmp.abilities = data[i].abilities
      abilities.push(tmp)
      tmp = {}
    }

    console.log(abilities,'aby')
    resolve(abilities)
  })
}

function findMissingTypes(data){
  return new Promise(function(resolve, reject) {
    let missingTypesArr = []
    for (var i = 0; i < types.length; i++) {
      if (!data.includes(types[i])) {
        missingTypesArr.push(types[i])
      }
    }
    if (missingTypesArr.length < 1) {
      missingTypesArr.push('none')
      missingTypesArr.push('are missing')
    }
    resolve(missingTypesArr)
  })
}
function sortOutRemoval(data){
  return new Promise(function(resolve, reject) {
    if (!data) {
      reject('error in removal')
    }
    let removal = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].removal.length > 0) {
        for (var j = 0; j < data[i].removal.length; j++) {
          removal.push(data[i].removal[j])
        }
      }
    }
    resolve(removal)
  })
}

function sortOutPriority(data){
  return new Promise(function(resolve, reject) {
    if (!data) {
      reject('error in removal')
    }
    let priority = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].priority.length > 0) {
        for (var j = 0; j < data[i].priority.length; j++) {
          priority.push(data[i].priority[j])
        }
      }
    }
    resolve(priority)
  })
}
function sortOutVoltTurn(data){
  return new Promise(function(resolve, reject) {
    if (!data) {
      reject('error in voltturn')
    }
    let voltTurn = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].voltTurn.length > 0) {
        for (var j = 0; j < data[i].voltTurn.length; j++) {
          voltTurn.push(data[i].voltTurn[j])
        }
      }
    }
    resolve(voltTurn)
  })
}
function sortOutTypes(data){
  return new Promise(function(resolve, reject) {
    if (!data) {
      reject('error in types')
    }
    let type = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].type.length > 0) {
        for (var j = 0; j < data[i].type.length; j++) {
          if (!type.includes(data[i].type[j].type.name)) {
            type.push(data[i].type[j].type.name)
          }
        }
      }
    }
    resolve(type)
  })
}

export {sortOutTypes, sortOutVoltTurn, sortOutPriority, sortOutStats, sortOutAbilities, sortOutRemoval,findMissingTypes, sortOutHazards}
