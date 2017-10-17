import React,{Component} from 'react'

export default class TypeList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'types': props.types})
    console.log(this.props)
  }
  render() {
    return (
      <div className="types">

      <h2> The team has {this.props.types.length - 1} out of the 18 avalible types </h2>
      {this.props.types.map(function (type) {
        return <p>{type}</p>
      })}
      </div>
    )
  }
}
