import React from 'react';
import './shopping-navbar.css'

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
                <h3>My Account <i className="fas fa-shopping-cart">{props.cart.length > 0 ? props.cart.length : null}</i></h3>
                
            </div>
        </header>
    );
};

export default Navbar;