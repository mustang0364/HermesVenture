import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Scenes from './components/Scenes.js';
import BackgroundVideoOne from './Media/Videos/FrenchAlps.m4v'
import BackgroundVideoTwo from './Media/Videos/Maldives.mp4'
import BackgroundVideoThree from './Media/Videos/Peru.mp4'
import SidebarImg from './Media/Images/sidebar.png';


class App extends Component {
  constructor(){
    super();

    this.state = {
      videoOneShown: true,
      videoTwoShown: false,
      videoThreeShown: false,
    }
  }
  changeSceneOne = () => {
    this.setState({
      videoOneShown: true,
      videoTwoShown: false,
      videoThreeShown: false,
    })
  }
  changeSceneTwo = () => {
    this.setState({
      videoOneShown: false,
      videoTwoShown: true,
      videoThreeShown: false,
    })
  }
  changeSceneThree = () => {
    this.setState({
      videoOneShown: false,
      videoTwoShown: false,
      videoThreeShown: true,
    })
  }
  render() {
    return (
      <div className="App">
      <Scenes video={
        this.state.videoOneShown ? BackgroundVideoOne 
        : this.state.videoTwoShown ? BackgroundVideoTwo 
        : this.state.videoThreeShown ? BackgroundVideoThree : null
        }
      ></Scenes>
       <div className="sidebar">
          <div className="sidebarheader">
              <h2>FEAT</h2>
              <div className='featuredsidebar'><h2>URED</h2><hr/></div>
              <h4>In This Scene</h4>
          </div>
          <img className='sidebarimg' src={SidebarImg} alt="sidebarsection"/>
      </div>
        <Routes />
      </div>
    );
  }
}

export default App;
