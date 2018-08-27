import React, { Component } from 'react';
import Item from './Dashboard-item';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './dashboard.css';

export default class Dashboard extends Component {
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
        console.log(this.state)
        return (
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h3>Share your #SomeHashTagWeComeUpWith</h3>
                    <h1>LOGO GOES HERE</h1>
                    <h3>SHARE THIS STORY:
                        <i className="fab fa-facebook-square dash"></i>
                        <i className="fab fa-twitter dash"></i>
                        <i className="fab fa-instagram dash"></i>
                    </h3>
                </header>
                <div className="item-container">
                    {this.state.products.map((item) => {
                        return (
                            <div>
                                <Link to={`/shopping/${item.category}/${item.id}`}><Item img={item.image} title={item.title}></Item></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}