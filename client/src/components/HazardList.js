import React,{Component} from 'react'

export default class HazardList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'hazards': props.hazards})
    this.setState({'removal': props.removal})
    this.setState({'voltTurn': props.voltTurn})
    this.setState({'abilities': props.abilities})
    this.setState({'priority': props.priority})
  }
  render() {
    return (
      <div className="types">

      <h2> Hazars this team has avalible </h2>
      {this.props.hazards.map(function (haz) {
        return <p>{haz.mon} has {haz.type}</p>
      })}

      <h2> Removal this team has avalible </h2>
      {this.props.removal.map(function (haz) {
        return <p>{haz.mon} has {haz.type}</p>
      })}

      <h2> Volt-turn this team has avalible </h2>
      {this.props.voltTurn.map(function (haz) {
        return <p>{haz.mon} has {haz.type}</p>
      })}
      <h2> priority this team has avalible </h2>
      {this.props.priority.map(function (haz) {
        return <p>{haz.mon} has {haz.type}</p>
      })}
      <h2> Possible abilities this team has avalible </h2>
      {this.props.abilities.map(function (haz) {
        return <p>{haz.name} has <b>{
          haz.abilities.map(function (abb) {
            console.log(abb)
            return abb + ', '
          })
        }</b></p>
      })}
      </div>
    )
  }
}
