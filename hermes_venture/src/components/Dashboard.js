import React, { Component } from 'react';
import Item from './Dashboard-item';
import {Link} from 'react-router-dom';
import jacket from '../Media/Products_images/Tibet/Clothes/Men/jacketLight/download.png'
import './dashboard.css';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-container">
                <header>
                    <h3>Share your #hermesVenture</h3>
                    <h1>LOGO GOES HERE</h1>
                    <h3>SHARE THIS STORY:
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-twitter"></i>
                        <a href="https://www.instagram.com/hermes_venture/">
                        <i className="fab fa-instagram" ></i>
                        </a>
                    </h3>
                </header>
                <div className="item-container">
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>
                    <Link to="#"><Item img={jacket} title={'This is a jacket'}></Item></Link>

                </div>
            </div>
        );
    }
}