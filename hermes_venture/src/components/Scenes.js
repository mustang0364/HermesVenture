import React from 'react';
import './Scenes.css';
import SidebarImg from '../Media/Images/sidebar.png';

export default function Scenes(props){
    return (
        <div className='scenesmain'>
            <video autoPlay muted loop id ='scenes'>
                <source src={props.video}/>
            </video>
            <div className="sidebar">
                <img className='sidebarimg' src={SidebarImg} alt="sidebarsection"/>
            </div>
        </div>
    );
}