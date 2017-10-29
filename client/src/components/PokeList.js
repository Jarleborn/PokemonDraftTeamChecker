import React,{Component} from 'react'
import {Col, Row} from 'react-materialize'
import { Line} from 'rc-progress';
export default class PokeList extends Component {
  constructor(props){
  	super(props)
  	this.setState({'mons': props.data})
  }

  procentCheck(value){
    return value/180*100
  }
  render() {

    return (
      <div className="class-name">
      <Row>
        {this.props.data.map(function (mon) {
          return <Col m={3} s={4} l={1}>
          <div className="mons">
            <h2>{mon.name}</h2>
            <div class="spriteHolder"><img class="sprite" alt="sprite" role={mon.name} src={mon.sprite} /></div>
            <br />
            <i>hp - {mon.hp}</i>
            <Line percent={mon.hp/255*100} strokeWidth="4" strokeColor="red" />
            <i>Attack - {mon.atk}</i>
            <Line percent={mon.atk/180*100} strokeWidth="4" strokeColor="orange" />
            <i>Defense - {mon.def}</i>
            <Line percent={mon.def/230*100} strokeWidth="4" strokeColor="yellow" />
            <i>Special Attack - {mon.spatk}</i>
            <Line percent={mon.spatk/180*100} strokeWidth="4" strokeColor="blue" />
            <i>Special Defense - {mon.spdef}</i>
            <Line percent={mon.spdef/230*100} strokeWidth="4" strokeColor="green" />
            <i>Speed - {mon.speed}</i>
            <Line percent={mon.speed/180*100} strokeWidth="4" strokeColor="pink" />
          </div>
          </Col>
        })}
      </Row>
      </div>
    )
  }
}
