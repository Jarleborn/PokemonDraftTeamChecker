import React,{Component} from 'react'

export default class PokeList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'mons': props.data})
  }
  render() {
    return (
      <div className="class-name">
      {this.props.data.map(function (mon) {
        return <div className="mons">
          <h2>{mon.name}</h2>
          <img role={mon.name} src={mon.sprite} />
        </div>
      })}
      </div>
    )
  }
}
