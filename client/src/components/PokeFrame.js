import React,{Component} from 'react'
import PokeList from './PokeList'
import TypeList from './TypeList'
import HazardList from './HazardList'
import types from '../lib/types'

export default class PokeFrame extends Component {
  componentWillMount() {
    this.emptyState()
  }
  constructor(props){
    super()
    this.state = {
      value: 'Write your mons here and seperate them with comma',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  emptyState(){
    this.setState({'data':''})
    this.setState({'hazards':''})
    this.setState({'removal':''})
    this.setState({'voltTurn':''})
    this.setState({'types':''})
    this.setState({'loading':false})
    this.setState({'serviceText': 'loading'})
    this.setState({'missingTypes':''})
    this.setState({'abilities':''})

  }
  reformMons(mons){
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
      } else if (monsArr[i].includes('mega') && monsArr[i] !== 'meganium') {
        monsArr[i] = monsArr[i].replace('mega','')  + '-mega'
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
  submitMons(monsToFetch){
    console.log(JSON.stringify({'mons': this.reformMons(monsToFetch)}))
    this.emptyState()
    this.setState({'loading':true})
    fetch('https://jarleborn.com/pdtc/getMons', {
    // fetch('http://localhost:1338/getMons', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method:'POST',
      body:JSON.stringify({'mons': this.reformMons(monsToFetch)}),
    })
    .then(res => {
      return res.json()
    })
    .then(resJson => {
      console.log(resJson)
      if(!resJson.error){
        this.setState({'loading':false})
        this.setState({'data': resJson})
        this.sortOutStats(this.state.data)
        this.sortOutHazards(this.state.data)
        .then(res => this.setState({'hazards': res}))
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        this.sortOutRemoval(this.state.data)
        .then(res => this.setState({'removal': res}))
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        this.sortOutPriority(this.state.data)
        .then(res => {
          console.log(res)
          this.setState({'priority': res})
        })
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        this.sortOutAbilities(this.state.data)
        .then(res =>{
          this.setState({'abilities': res})
        })
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        this.sortOutVoltTurn(this.state.data)
        .then(res => this.setState({'voltTurn': res}))
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        this.sortOutTypes(this.state.data)
        .then(res => {
          this.setState({'types': res})
          this.findMissingTypes()
        })
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
      } else{
        console.log('errrrrrrrrrrrrror')
        this.setState({'serviceText':resJson.error})
      }

    })
  }
  sortOutHazards(data){

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
  sortOutStats(data){
    for (var i = 0; i < data.length; i++) {
      data[i].speed = data[i].stats[0].base_stat
      data[i].spdef = data[i].stats[1].base_stat
      data[i].spatk = data[i].stats[2].base_stat
      data[i].def = data[i].stats[3].base_stat
      data[i].atk = data[i].stats[4].base_stat
      data[i].hp = data[i].stats[5].base_stat
    }
  }
  sortOutAbilities(data){
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

  findMissingTypes(){

    let missingTypesArr = []
    for (var i = 0; i < types.length; i++) {
      if (!this.state.types.includes(types[i])) {
        missingTypesArr.push(types[i])
      }
    }
    if (missingTypesArr.length < 1) {
      missingTypesArr.push('none')
      missingTypesArr.push('are missing')
    }
    this.setState({'missingTypes':missingTypesArr})
  }
  sortOutRemoval(data){
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

  sortOutPriority(data){
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
  sortOutVoltTurn(data){
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
  sortOutTypes(data){
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

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.submitMons(this.state.value)
  }

  render() {
    return (
      <div className="class-name">
      { this.state.missingTypes[0] ?
        <div id="monData">
        <PokeList data={this.state.data}/>
        <hr />
        <TypeList types={this.state.types} missingTypes={this.state.missingTypes}/>
        <HazardList hazards={this.state.hazards} abilities={this.state.abilities} priority={this.state.priority} removal={this.state.removal} voltTurn={this.state.voltTurn}/>
        <hr />
        </div>
        :
        <div id="submitform">
        <form onSubmit={this.handleSubmit}>
        <label>
        <textarea rows='12' value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
        </form>
        </div>
      }

      {this.state.loading ? <h4>{this.state.serviceText}</h4> : ''}
      </div>
    )
  }
}
