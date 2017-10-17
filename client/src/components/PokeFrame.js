import React,{Component} from 'react'
import PokeList from './PokeList'
import TypeList from './TypeList'
import HazardList from './HazardList'
import types from '../lib/types'

export default class PokeFrame extends Component {
  componentWillMount() {
    this.setState({'data':''})
    this.setState({'hazards':''})
    this.setState({'removal':''})
    this.setState({'voltTurn':''})
    this.setState({'types':''})
    this.setState({'loading':false})
    this.setState({'missingTypes':''})
  }
  constructor(props){
    super()
    // this.submitMons({'mons':['xatu', 'natu', 'ditto', 'mew']})
    this.state = {
      value: 'Write your mons here and seperate them with comma',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  reformMons(mons){
    console.log(mons.toLowerCase().replace(/\s/g,'').split(','))
    let monsArr = mons.toLowerCase().replace(/\s/g,'').split(',')
    for (var i = 0; i < monsArr.length; i++) {
      console.log(monsArr[i])
      if (monsArr[i] === 'thundurus' || monsArr[i] === 'thundurus-i') {
        monsArr[i] = 'thundurus-incarnate'
      }
      if (monsArr[i] === 'thundurus-t') {
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
      console.log(monsArr[i])
    }
    return monsArr
  }
  submitMons(monsToFetch){
    this.setState({'loading':true})
    console.log(monsToFetch)
    fetch('http://localhost:1338/getMons', {
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
      this.setState({'loading':false})
      this.setState({'data': resJson})
      this.sortOutHazards(this.state.data)
      .then(res => this.setState({'hazards': res}))
      this.sortOutRemoval(this.state.data)
      .then(res => this.setState({'removal': res}))
      this.sortOutVoltTurn(this.state.data)
      .then(res => this.setState({'voltTurn': res}))
      this.sortOutTypes(this.state.data)
      .then(res => {
        this.setState({'types': res})
        this.findMissingTypes()
      })

    })
  }
  sortOutHazards(data){
    return new Promise(function(resolve, reject) {
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

  findMissingTypes(){

    let missingTypesArr = []
    for (var i = 0; i < types.length; i++) {
      console.log(this.state.types.includes(types[i]))
      console.log(types[i])
      if (!this.state.types.includes(types[i])) {
        missingTypesArr.push(types[i])
        console.log(missingTypesArr)
      }
    }
    console.log(missingTypesArr)
    if (missingTypesArr.length < 1) {
      missingTypesArr.push('none')
      missingTypesArr.push('are missing')
    }
    this.setState({'missingTypes':missingTypesArr})
  }
  sortOutRemoval(data){
    return new Promise(function(resolve, reject) {
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
  sortOutVoltTurn(data){
    return new Promise(function(resolve, reject) {
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
              <HazardList hazards={this.state.hazards} removal={this.state.removal} voltTurn={this.state.voltTurn}/>
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

          {this.state.loading ? <h1>Loading</h1> : ''}
      </div>
    )
  }
}
