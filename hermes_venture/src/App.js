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
import Dashboard from './components/Dashboard.js';
import ButtonImage from './Media/Images/Scenebuttons-inactive.png';
import Buttonactive from './Media/Images/Scenebuttons.png';
import DashboardArrow from './Media/Images/dashboard-arrow.png';


class App extends Component {
  constructor(){
    super();

    this.state = {
      videoOneShown: true,
      videoTwoShown: false,
      videoThreeShown: false,
      currentScene: 'Tibet',
      featuredProducts: [],
    }
  }
  componentDidMount(){
    this.updateFeaturedProductsToTibet();
  }
  updateFeaturedProductsToTibet = () => {
    axios.get(`/featuredproducts/${this.state.currentScene}`).then(res => {
      this.setState({
        featuredProducts: res.data,
      })
    })
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
  // getProductImageOne = () => {
  //   this.state.featuredProducts.map((e) => {
  //     console.log(e.image)
  //   })
  // }

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
              <div className="bottomsection">
                <div className="fpbg">
                    <img className='productimagesb' src={this.state.featuredProducts.imageOne} alt=''/>
                    <img src={BackdropOne} alt="firstbackdrop"/>
                </div>
                <div className="fpbg">
                    <img className='productimagesb' src={this.state.featuredProducts.imageTwo} alt=''/>
                    <img src={Backdroptwo} alt="secondbackdrop"/>
                </div>
                <div className="fpbg">
                    <img className='productimagesb' src={this.state.featuredProducts.imageThree} alt=''/>
                    <img src={Backdropthree} alt="thirdbackdrop"/>
                </div>
                <div className="fpbg">
                    <img className='productimagesb' src={this.state.featuredProducts.imageFour} alt=''/>
                    <img src={Backdropfour} alt='fourthbackdrop'/>
                </div>
              </div>
          </div>
          <img className='sidebarimg' src={SidebarImg} alt="sidebarsection"/>
      </div>
      <div className="footer">        
            <a href="#dashboard"><img src={DashboardArrow} alt=""/></a>
      </div>
      <div className="buttonsection">
          <img className='arrows' src={TopArrow} alt="arrowtop"/>
          <button onClick={() => this.changeSceneOne()}><img alt='' className={this.state.videoOneShown === true ? 'buttonactive' : 'buttoninactive'} src={this.state.videoOneShown === true ? Buttonactive : ButtonImage} />
          </button>
          <button onClick={() => this.changeSceneTwo()}><img alt='' className={this.state.videoTwoShown === true ? 'buttonactive' : 'buttoninactive'} src={this.state.videoTwoShown === true ? Buttonactive : ButtonImage} /></button>
          <button onClick={() => this.changeSceneThree()}><img alt='' className={this.state.videoThreeShown === true ? 'buttonactive' : 'buttoninactive'} src={this.state.videoThreeShown === true ? Buttonactive : ButtonImage} /></button>
          <img className='arrows' src={BottomArrow} alt="arrowbottom"/>
      </div>
        <Routes />
        <Dashboard />
      </div>
    );
  }
}

export default App;
