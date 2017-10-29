import React,{Component} from 'react'
import PokeList from './PokeList'
import TypeList from './TypeList'
import HazardList from './HazardList'
import {reformMons} from '../lib/nameFixer'
import {sortOutTypes, sortOutVoltTurn, sortOutPriority, sortOutStats,findMissingTypes, sortOutAbilities, sortOutRemoval, sortOutHazards} from '../lib/sorters'

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

  submitMons(monsToFetch){
    this.emptyState()
    this.setState({'loading':true})
    // fetch('https://jarleborn.com/pdtc/getMons', {
    fetch('http://localhost:1338/getMons', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method:'POST',
      body:JSON.stringify({'mons': reformMons(monsToFetch)}),
    })
    .then(res => {
      return res.json()
    })
    .then(resJson => {
      console.log(resJson)
      if(!resJson.error){
        this.setState({'loading':false})
        this.setState({'data': resJson})
        sortOutStats(this.state.data)
        sortOutHazards(this.state.data)
        .then(res => this.setState({'hazards': res}))
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        sortOutRemoval(this.state.data)
        .then(res => this.setState({'removal': res}))
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        sortOutPriority(this.state.data)
        .then(res => {
          console.log(res)
          this.setState({'priority': res})
        })
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        sortOutAbilities(this.state.data)
        .then(res =>{
          this.setState({'abilities': res})
        })
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        sortOutVoltTurn(this.state.data)
        .then(res => this.setState({'voltTurn': res}))
        .catch(err => {
          this.setState({'loading':true})
          this.setState({'serviceText':err.message})
        })
        sortOutTypes(this.state.data)
        .then(res => {
          this.setState({'types': res})
          findMissingTypes(res)
          .then(res =>{
            this.setState({'missingTypes':res})
          })
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
