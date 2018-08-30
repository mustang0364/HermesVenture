import React, { Component } from 'react';
import './shopping-navbar.css'
import {Link} from 'react-router-dom';
import {AppContext} from './ContextProvider';

class Navbar  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: 'none'
        }
    }

    showMenu() {
        if(this.state.menu === 'none') {
            this.setState({menu: 'block'})
        } else {
            this.setState({menu: 'none'})
        }
    }
    render() {
        const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
        const style = {
            display: this.state.menu
        }
        return (
            <AppContext.Consumer>
                {(context) => {
                    console.log(context.user)
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
                            <div onMouseLeave={() => this.showMenu()} className="dropdown-container" >
                                <h3 onMouseEnter={() => this.showMenu()}>Menu</h3>
                                <h2><i className="fas fa-shopping-cart">{this.props.cart.length > 0 ? this.props.cart.length : null}</i></h2>
                                <div style={style} className="dropdown-content">
                                    <ul>
                                        {context.user ? null : <li><a href={auth0}>Login</a></li>}
                                        <li>Profile</li>
                                        {context.user ? <li>Logout</li> : null}
                                        <Link to="/"><li>Dashboard</li></Link>
                                        <Link to="/shopping"><li>Products</li></Link>
                                        <Link to="/shopping/cart"><li>Cart</li></Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>
                )
            }}
        </AppContext.Consumer>
        );
    }
}
export default Navbar;