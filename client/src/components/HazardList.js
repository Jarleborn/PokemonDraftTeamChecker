import React,{Component} from 'react'

export default class HazardList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'hazards': props.hazards})
    this.setState({'removal': props.removal})
    this.setState({'voltTurn': props.voltTurn})
    console.log(this.props)
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
      </div>
    )
  }
}
