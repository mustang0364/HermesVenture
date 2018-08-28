import React from 'react';
import Item from './Dashboard-item';
import {Link} from 'react-router-dom';
import './dashboard.css';
import logoImage from '../Media/Images/Logo/logoTranps.png'

export default function Dashboard(props){
    return (
    <div className='dashboard-container'>
        <div id="dashboard"></div>
            <header>
                <h3>Share your "#hermesVenture"</h3>
                {/* <img  className="logo" src={logoImage} alt="logo"/> */}
                <h3>SHARE THIS STORY:
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-twitter"></i>
                    <a href="https://www.instagram.com/hermes_venture/">
                    <i className="fab fa-instagram" ></i>
                    </a>
                </h3>
            </header>
            <div className="item-container">
                {props.products.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link onClick={() => props.redirect()} to={`/shopping/${item.category}/${item.id}`}><Item img={item.image} title={item.title}></Item></Link>
                        </div>
                    )
                })}
            </div>
    </div>
    );
}