import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import PokeFrame from './components/PokeFrame'
import {Footer} from 'react-materialize'
class App extends Component {


  render() {
    return (
      <div className= 'App '>
      <header className= 'App-header '>
      <img src={logo} className= 'App-logo ' alt= 'logo ' />
      <h1 className='App-title'>Pokemon Draft Team Checker</h1>
      <p> Update the page to try another team </p>
      </header>
      <PokeFrame />
      <Footer copyrights="&copy 2017 Copyright Text"
      moreLinks={
        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
      }
      links={
        <ul>
        <li><a className="grey-text text-lighten-3" target="_blank" href="https://github.com/Jarleborn/PokemonDraftTeamChecker">GitHub</a></li>
        <li><a className="grey-text text-lighten-3" target="_blank" href="https://discord.gg/Pq3bUHr">Discord</a></li>
        </ul>
      }
      className='example'
      >
      <p className="white-text">Here's the contact info</p>

      </Footer>
      </div>
    )
  }
}

export default App
