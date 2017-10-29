import React,{Component} from 'react'

export default class TypeList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'types': props.types})
    this.setState({'missingTypes': props.missingTypes})
  }
  render() {
    return (
      <div className="types">

        <h2> The team has {this.props.types.length} out of the 18  types avalible </h2>
        <div id="typesCoverd">
        <b> Types covered </b>
          {this.props.types.map(function (type) {
            return <p>{type}</p>
          })}
        </div>
        <div id="missingTypes">
          <b>Types missing </b>
          {this.props.missingTypes.map(function (type) {
            return <p>{type}</p>
          })}
        </div>
      </div>
    )
  }
}
