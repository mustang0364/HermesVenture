import React, { Component } from 'react';
import './dashboard-item.css';

export default class Item extends Component {
    render() {
        return (
            <div className="item">
                <img className='dashboardimg' alt='products' src={this.props.img}/>
                <h3>{this.props.title}</h3>
            </div>
        );
    }
}