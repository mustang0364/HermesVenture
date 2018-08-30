import React, { Component } from 'react';
import Scenes from './Scenes.js';
import BackgroundVideoOne from '../Media/Videos/Snow.mp4'
import BackgroundVideoTwo from '../Media/Videos/Beach.mp4'
import BackgroundVideoThree from '../Media/Videos/Rainforest.mp4'
import SidebarImg from '../Media/Images/sidebar.png';
import TopArrow from '../Media/Images/arrowtop.png';
import BottomArrow from '../Media/Images/arrowbottom.png';
import axios from 'axios';
import ButtonImage from '../Media/Images/Scenebuttons-inactive.png';
import Buttonactive from '../Media/Images/Scenebuttons.png';
import circle from '../Media/Images/Logo/circle.png';
import './home.css';
import WhiteLogo from '../Media/Images/Logo/circleWhiteR.png'
import BlackLogo from '../Media/Images/Logo/circleLogoRBlack.png'
import BlueLogo from '../Media/Images/Logo/circleLogoBlueR.png' 
import NameWhite from '../Media/Images/Logo/bootsNameWhite.png'
import NameBlack from '../Media/Images/Logo/bootsName.png'
import NameBlue from '../Media/Images/Logo/bootsNameBlue.png'

import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(){
      super();
  
      this.state = {
        videoOneShown: true,
        videoTwoShown: false,
        videoThreeShown: false,
        fpTibet: [],
        fpMaldives: [],
        fpPeru: [],
      }
    }
    componentDidMount(){
        this.updateTibetFP();
    }
    updateTibetFP = () => {
      setTimeout(() => {
        axios.get('/fptibet').then(res => {
          this.setState({
            fpTibet: res.data,
          })
        })
      }, 500);
    }
    updatePeruFP = () => {
      setTimeout(() => {
        axios.get('/fpperu').then(res => {
          this.setState({
            fpPeru: res.data,
          })
        })
      }, 500);
    }
    updateMaldivesFP = () => {
      setTimeout(() => {
        axios.get('/fpmaldives').then(res => {
          this.setState({
            fpMaldives: res.data,
          })
        })
      }, 500);
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
        <div className={this.state.videoOneShown ? 'videoshown' : 'videohidden'}>
        <Scenes video={BackgroundVideoOne} />
        </div>
        <div className={this.state.videoTwoShown ? 'videoshown' : 'videohidden'}>
        <Scenes video={BackgroundVideoTwo} />
        </div>
        <div className={this.state.videoThreeShown ? 'videoshown' : 'videohidden'}>
        <Scenes video={BackgroundVideoThree} />
        </div>
        <img className='homelogo' src={
          this.state.videoOneShown 
          ? BlackLogo
          : this.state.videoTwoShown
          ? BlueLogo
          : this.state.videoThreeShown 
          ? WhiteLogo
          : null} alt=""/>

          <img className='name' src={
          this.state.videoOneShown 
          ? NameWhite
          : this.state.videoTwoShown
          ? NameBlue
          : this.state.videoThreeShown 
          ? NameWhite
          : null} alt=""/>







         <div className="sidebar">
            <div className="sidebarheader">
                <h2>FEAT</h2>
                <div className='featuredsidebar'><h2>URED</h2><hr/></div>
                <h4>In This Scene</h4>
                <div className="bottomsection">
                
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/shopping/${this.state.fpTibet.productOneCategory}/${this.state.fpTibet.productOneid}`}>
                      <img className='productimagesb' src={this.state.fpTibet.productOneimage} alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/shopping/${this.state.fpTibet.productTwoCategory}/${this.state.fpTibet.productTwoid}`}>
                      <img className='productimagesb' src={this.state.fpTibet.productTwoimage} alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/shopping/${this.state.fpTibet.productThreeCategory}/${this.state.fpTibet.productThreeid}`}>
                      <img className='productimagesb' src={this.state.fpTibet.productThreeimage} alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/shopping/${this.state.fpTibet.productFourCategory}/${this.state.fpTibet.productFourid}`}>
                      <img className='productimagesb' src={this.state.fpTibet.productFourimage} alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                </div>
            </div>
            <img className='sidebarimg' src={SidebarImg} alt="sidebarsection"/>
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