function reformMons(mons){
  let monsArr = mons.toLowerCase().replace(/\s/g,'').split(',')
  console.log(monsArr)
  for (var i = 0; i < monsArr.length; i++) {
    if (monsArr[i].includes('%')) {
      monsArr[i] = monsArr[i].replace('%','')
    }
    if (monsArr[i].includes('m.')) {
      monsArr[i] = monsArr[i].replace('m.','')  + '-mega'
    } else if (monsArr[i].includes('mega-')) {
      monsArr[i] = monsArr[i].replace('mega-','')  + '-mega'
    } else if (monsArr[i].includes('mega ') && monsArr[i] !== 'meganium') {
      monsArr[i] = monsArr[i].replace('mega ','')  + '-mega'
    }

    if (monsArr[i] === 'charizard-x-mega') {
      monsArr[i] = 'charizard-mega-x'
    }
    if (monsArr[i] === 'charizard-y-mega') {
      monsArr[i] = 'charizard-mega-y'
    }
    if (monsArr[i].includes('alolan-')) {
      monsArr[i] = monsArr[i].replace('alolan-','')  + '-alola'
    }
    if (monsArr[i].includes('alolan')) {
      monsArr[i] = monsArr[i].replace('alolan','')  + '-alola'
    }
    if (monsArr[i].includes('-alolan')) {
      monsArr[i] = monsArr[i].replace('-alolan','')  + '-alola'
    }
    if (monsArr[i] === 'thundurus' || monsArr[i] === 'thundurus-i' || monsArr[i] === 'thundurusi') {
      monsArr[i] = 'thundurus-incarnate'
    }
    if (monsArr[i] === 'tapubulu' ) {
      monsArr[i] = 'tapu-bulu'
    }
    if(monsArr[i] === 'hoopau'){
      monsArr[i] = 'hoopa-unbound'
    }
    if(monsArr[i] === 'wishiwashi'){
      monsArr[i] = 'wishiwashi-schoold'
    }
    if (monsArr[i] === 'tapufini' ) {
      monsArr[i] = 'tapu-fini'
    }
    if (monsArr[i] === 'tapulele' ) {
      monsArr[i] = 'tapu-lele'
    }
    if (monsArr[i] === 'tapukoko' ) {
      monsArr[i] = 'tapu-koko'
    }
    if(monsArr[i] === 'kyuremblack' || monsArr[i] === 'kyuremb'){
      monsArr[i] = 'kyurem-black'
    }
    if(monsArr[i] === 'kyuremwhite' || monsArr[i] === 'kyuremw'){
      monsArr[i] = 'kyurem-white'
    }
    if(monsArr[i] === 'rotom-w'){
      monsArr[i] = 'rotom-wash'
    }
    if (monsArr[i] === 'rotom-h' ) {
      monsArr[i] = 'rotom-heat'
    }
    if (monsArr[i] === 'rotom-m' ) {
      monsArr[i] = 'rotom-mow'
    }
    if (monsArr[i] === 'rotom-f' ) {
      monsArr[i] = 'rotom-frost'
    }
    if (monsArr[i] === 'mimikyu' ) {
      monsArr[i] = 'mimikyu-disguised'
    }
    if (monsArr[i] === 'thundurus-t' || monsArr[i] === 'thundurust') {
      monsArr[i] = 'thundurus-therian'
    }
    if (monsArr[i] === 'tornadus' || monsArr[i] === 'tornadus-i') {
      monsArr[i] = 'tornadus-incarnate'
    }
    if (monsArr[i] === 'tornadus-t') {
      monsArr[i] = 'tornadus-therian'
    }
    if (monsArr[i] === 'landorus' || monsArr[i] === 'landorus-i') {
      monsArr[i] = 'landorus-incarnate'
    }
    if (monsArr[i] === 'landorus-t') {
      monsArr[i] = 'landorus-therian'
    }
    if (monsArr[i] === 'shaymin' || monsArr[i] === 'shaymin-l') {
      monsArr[i] = 'shaymin-land'
    }
    if (monsArr[i] === 'shaymin-s') {
      monsArr[i] = 'shaymin-sky'
    }
    if (monsArr[i] === 'meowstic') {
      monsArr[i] = 'meowstic-male'
    }
    if (monsArr[i] === 'darmanitan') {
      monsArr[i] = 'darmanitan-standard'
    }
    if (monsArr[i] === 'gourgeist') {
      monsArr[i] = 'gourgeist-average'
    }
    if (monsArr[i] === 'keldeo') {
      monsArr[i]  = 'keldeo-ordinary'
    }
    if(monsArr[i] === 'meloetta'){
      monsArr[i] = 'meloetta-aria'
    }
  }
  return monsArr
}

export {reformMons}
