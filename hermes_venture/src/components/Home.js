import React, { Component } from 'react';
import Scenes from './Scenes.js';
import BackgroundVideoOne from '../Media/Videos/FrenchAlps.m4v'
import BackgroundVideoTwo from '../Media/Videos/Maldives.mp4'
import BackgroundVideoThree from '../Media/Videos/Peru.mp4'
import SidebarImg from '../Media/Images/sidebar.png';
import TopArrow from '../Media/Images/arrowtop.png';
import BottomArrow from '../Media/Images/arrowbottom.png';

import Backdroptwo from '../Media/Images/backdroptwo.png';
import Backdropthree from '../Media/Images/backdropthree.png';

import axios from 'axios';
import ButtonImage from '../Media/Images/Scenebuttons-inactive.png';
import Buttonactive from '../Media/Images/Scenebuttons.png';
import DashboardArrow from '../Media/Images/dashboard-arrow.png';
import circle from '../Media/Images/Logo/circle.png';
import './home.css';
import {Link} from 'react-router-dom';
import WhiteLogo from '../Media/Images/Logo/white_logo_transparent.png'
import BlackLogo from '../Media/Images/Logo/dark_logo_transparent.png'
import BlueLogo from '../Media/Images/Logo/logoTranps.png'

class Home extends Component {
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
  
    render() {
      return (
        <div className="Home">
        <div className="sceneone">
        <Scenes video={BackgroundVideoOne} />
        </div>
        <div className="scenetwo">
        <Scenes video={BackgroundVideoTwo} />
        </div>
        <div className="scenethree">
        <Scenes video={BackgroundVideoThree} />
        </div>
        <img className='homelogo' src={
          this.state.videoOneShown 
          ? WhiteLogo
          : this.state.videoTwoShown
          ? BlackLogo
          : this.state.videoThreeShown 
          ? BlueLogo 
          : null} alt=""/>
         <div className="sidebar">
            <div className="sidebarheader">
                <h2>FEAT</h2>
                <div className='featuredsidebar'><h2>URED</h2><hr/></div>
                <h4>In This Scene</h4>
                <div className="bottomsection">
                  <div className="fpbg">
<<<<<<< HEAD
                      <img className='productimagesb' src={this.state.featuredProducts.imageOne} alt=''/>
                      <img src={circle} alt="firstbackdrop"/>
                  </div>
                  <div className="fpbg">
                      <img className='productimagesb' src={this.state.featuredProducts.imageTwo} alt=''/>
                      <img src={circle} alt="secondbackdrop"/>
                  </div>
                  <div className="fpbg">
                      <img className='productimagesb' src={this.state.featuredProducts.imageThree} alt=''/>
                      <img src={circle} alt="thirdbackdrop"/>
                  </div>
                  <div className="fpbg">
                      <img className='productimagesb' src={this.state.featuredProducts.imageFour} alt=''/>
                      <img src={circle} alt='fourthbackdrop'/>
=======
                      <img className='productimagesb' src={this.state.featuredProducts.productOneimage} alt=''/>
                      <img src={BackdropOne} alt="firstbackdrop"/>
                  </div>
                  <div className="fpbg">
                      <img className='productimagesb' src={this.state.featuredProducts.productTwoimage} alt=''/>
                      <img src={Backdroptwo} alt="secondbackdrop"/>
                  </div>
                  <div className="fpbg">
                      <img className='productimagesb' src={this.state.featuredProducts.productThreeimage} alt=''/>
                      <img src={Backdropthree} alt="thirdbackdrop"/>
                  </div>
                  <div className="fpbg">
                      <img className='productimagesb' src={this.state.featuredProducts.productFourimage} alt=''/>
                      <img src={Backdropfour} alt='fourthbackdrop'/>
>>>>>>> a8cc196b5b16a86bf5c168156212b083a619f827
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
        </div>
      );
    }
  }
  
  export default Home;