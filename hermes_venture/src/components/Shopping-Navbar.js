import React, { Component } from 'react';
import './shopping-navbar.css'
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
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
                <Link to="/shopping"><i className="fas fa-home"></i></Link>
            </h3>
            <div className="navbar-account">
                <a href={auth0}>Login</a>
                <h3>My Account</h3><h2><i className="fas fa-shopping-cart">{props.cart.length > 0 ? props.cart.length : null}</i></h2>
            </div>
        </header>
    );
};

export default Navbar;