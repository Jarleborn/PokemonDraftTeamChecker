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
        return <div>
          <h2>{mon.name}</h2>
          <img src={mon.sprite} />
        </div>
      })}
      </div>
    )
  }
}
