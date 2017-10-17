import React,{Component} from 'react'
import PokeList from './PokeList'
import TypeList from './TypeList'
import HazardList from './HazardList'
import VoltTurnList from './VoltTurnList'
export default class PokeFrame extends Component {
  componentWillMount() {
    this.setState({'data':''})
    this.setState({'hazards':''})
    this.setState({'removal':''})
    this.setState({'voltTurn':''})
    this.setState({'types':''})
    this.setState({'loading':false})
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
    return mons.toLowerCase().replace(/\s/g,'').split(',')
  }
  submitMons(monsToFetch){
    this.setState({'loading':true})
    console.log(monsToFetch)
    fetch('http://localhost:1337/test', {
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
      .then(res => this.setState({'types': res}))
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
          { this.state.types[1] ?
            <div id="monData">
              <PokeList data={this.state.data}/>
              <hr />
              <TypeList types={this.state.types} />
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
