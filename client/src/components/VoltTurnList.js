import React,{Component} from 'react'

export default class VoltTurnList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'voltTurn': props.voltTurn})
    console.log(this.props)
  }
  render() {
    return (
      <div className="types">

      <h2> Volt Turn options this team has avalible </h2>
      {this.props.voltTurn.map(function (vt) {
        return <p>{vt.mon} has {vt.type}</p>
      })}

      </div>
    )
  }
}
