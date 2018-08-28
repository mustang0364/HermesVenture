import React, { Component } from 'react';
import {AppContext} from './ContextProvider';
import Navbar from './Shopping-Navbar';
import axios from 'axios';
import './shopping-dashboard.css';
class Shopping extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        axios.get('/dashboard').then(res => {
            this.setState({products: res.data})
        })
    }
    render() {
        return (
            <div>
                <AppContext.Consumer>
                    {(context) => {
                        return (
                            <div>
                                <Navbar cart={context.cart}/>
                                <div className="shopping-container">
                                    <div className="top-image">
                                        <div className="content-container">
                                            <div className="left-nav-pane">
                                                <ul>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                    <li>List Item</li>
                                                </ul>
                                            </div>
                                            <div className="products-container">
                                                {this.state.products ?
                                                    <div className="products">
                                                        {this.state.products.map((product) => {
                                                            return (
                                                                <div className="product-info">
                                                                    <img src={product.image}/>
                                                                    <h4>{product.title}</h4>
                                                                    <p>{product.price}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                : <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </AppContext.Consumer>
            </div>
        );
    }
}
export default Shopping