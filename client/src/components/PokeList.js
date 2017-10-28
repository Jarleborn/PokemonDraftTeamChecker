import React,{Component} from 'react'
import {Col, Row} from 'react-materialize'
export default class PokeList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'mons': props.data})
  }
  render() {
    return (
      <div className="class-name">
      <Row>
        {this.props.data.map(function (mon) {
          return <Col m={3} s={4} l={1}>
          <div className="mons">
            <h2>{mon.name}</h2>
            <img alt="sprite" role={mon.name} src={mon.sprite} />
          </div>
          </Col>
        })}
      </Row>
      </div>
    )
  }
}
