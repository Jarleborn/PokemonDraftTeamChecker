import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import PokeFrame from './components/PokeFrame'

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
      </div>
    )
  }
}

export default App
