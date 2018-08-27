import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Scenes from './components/Scenes.js';
import BackgroundVideoOne from './Media/Videos/FrenchAlps.m4v'
import BackgroundVideoTwo from './Media/Videos/Maldives.mp4'
import BackgroundVideoThree from './Media/Videos/Peru.mp4'
import SidebarImg from './Media/Images/sidebar.png';
import TopArrow from './Media/Images/arrowtop.png';
import BottomArrow from './Media/Images/arrowbottom.png';
import BackdropOne from './Media/Images/backdropone.png';
import Backdroptwo from './Media/Images/backdroptwo.png';
import Backdropthree from './Media/Images/backdropthree.png';
import Backdropfour from './Media/Images/backdropone.png';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();

    this.state = {
      videoOneShown: true,
      videoTwoShown: false,
      videoThreeShown: false,
      currentScene: 'Tibet',
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
    const productImageOne = axios.get(`/featuredproducts/${this.state.currentScene}`).then(res => res.data[0])
    console.log(productImageOne)
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
              <div className="bottomsection">
                <div className="fpbg">
                    <img src={productImageOne} alt='pdimg'/>
                    <img src={BackdropOne} alt="firstbackdrop"/>
                </div>
                <div className="fpbg">
                    <img src={Backdroptwo} alt="secondbackdrop"/>
                </div>
                <div className="fpbg">
                    <img src={Backdropthree} alt="thirdbackdrop"/>
                </div>
                <div className="fpbg">
                    <img src={Backdropfour} alt='fourthbackdrop'/>
                </div>
              </div>
          </div>
          <img className='sidebarimg' src={SidebarImg} alt="sidebarsection"/>
      </div>
      <div className="buttonsection">
          <img src={TopArrow} alt="arrowtop"/>
          <button onClick={() => this.changeSceneOne()}>One</button>
          <button onClick={() => this.changeSceneTwo()}>Two</button>
          <button onClick={() => this.changeSceneThree()}>Three</button>
          <img src={BottomArrow} alt="arrowbottom"/>
      </div>
        <Routes />
      </div>
    );
  }
}

export default App;
