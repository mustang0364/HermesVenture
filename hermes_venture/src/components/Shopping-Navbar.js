import React from 'react';
import './shopping-navbar.css'
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header className="navbar-header">
            <h3 className="navbar-social">
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-twitter"></i>
                <a href="https://www.instagram.com/hermes_venture/">
                    <i className="fab fa-instagram" ></i>
                </a>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-pinterest"></i>
            </h3>
            <div className="navbar-account">
                <h3>My Account</h3><h2><i className="fas fa-shopping-cart">{props.cart.length > 0 ? props.cart.length : null}</i></h2>
                
            </div>
        </header>
    );
};

export default Navbar;