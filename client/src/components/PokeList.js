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
            <img alt="sprite" role={mon.name} src={mon.sprite} />
            <br />
            <i>hp</i>
            <Line percent={mon.hp/250*100} strokeWidth="4" strokeColor="#D3D3D3" />
            <i>Attack</i>
            <Line percent={mon.atk/250*100} strokeWidth="4" strokeColor="#D3D3D3" />
            <i>Defense</i>
            <Line percent={mon.def/250*100} strokeWidth="4" strokeColor="#D3D3D3" />
            <i>Special Attack</i>
            <Line percent={mon.spatk/250*100} strokeWidth="4" strokeColor="#D3D3D3" />
            <i>Special Defense</i>
            <Line percent={mon.spdef/250*100} strokeWidth="4" strokeColor="#D3D3D3" />
            <i>Speed</i>
            <Line percent={mon.speed/250*100} strokeWidth="4" strokeColor="#D3D3D3" />
          </div>
          </Col>
        })}
      </Row>
      </div>
    )
  }
}
