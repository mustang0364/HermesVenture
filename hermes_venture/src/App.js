import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Scenes from './components/Scenes.js';
import BackgroundVideoOne from './Media/Videos/FrenchAlps.m4v'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Scenes video={BackgroundVideoOne}
      ></Scenes>
        <Routes />
      </div>
    );
  }
}

export default App;
