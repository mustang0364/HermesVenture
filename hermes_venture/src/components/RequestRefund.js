import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Shopping-Navbar';
import {AppContext} from './ContextProvider';
import {Link} from 'react-router-dom';
import './invoice.css'

class RequestRefund extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
        }
    }

    componentDidMount() {
        console.log('hit request refund')
        axios.get(`/invoice/${this.props.match.params.id}`).then(res => {
            this.setState({order: res.data})
        })
    }
    render() {
        console.log(this.state)
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div>
                            <Navbar cart={context.user}/>
                            {/* <div className="refund-body">
                                {this.state.order.length > 0 ?
                                    <div className="refund-container">                                
                                        {this.state.order.map((order, index) => {
                                            return (
                                                <div className="refund-order-container" key={index}>
                                                    <img src={order.image}/>
                                                    <h1>{order.title}</h1>
                                                    <p>{order.price}</p>
                                                </div>
                                            )
                                        })}
                                        <div>
                                            <input placeholder="Name"/>
                                            <input placeholder="Email"/>
                                            <textarea placeholder="What do you want refunded?"/>
                                        </div>
                                    </div>
                                : <h1>Loading...</h1>}
                            </div> */}
                        </div>

                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default RequestRefund