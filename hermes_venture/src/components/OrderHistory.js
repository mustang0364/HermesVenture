import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Shopping-Navbar';
import {AppContext} from './ContextProvider';
import './orderHistory.css'
export default class OrderHistory extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
        }
    }

    componentDidMount() {
        axios.get('/orderHistory').then(res => {
            let tempArr = res.data
            console.log(tempArr)
            let newArr = []
            for(let i = 0; i < tempArr.length; i++) {
                console.log(tempArr[i].cart_id)
                console.log(i + 1)
                if(tempArr[i].cart_id === tempArr[i + 1].cart_id) {
                    let arr = []
                    arr.push(tempArr[i])
                    newArr.push(arr)
                } else {
                    let arr = []
                    arr.push(tempArr[i])
                    newArr.push(arr)
                }
            }
            console.log(newArr)
            return newArr
            // this.setState({
            //     orders: res.data
            // })
        })
    }
    render() {
        console.log(this.state)
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div className="order-history-body">
                            <Navbar cart={context.cart}/>
                            {this.state.orders ?
                                <div className="order-history-container">
                                    {this.state.orders.map((order, index) => {
                                        return (
                                            <div key={index} className="order-container">
                                                <h2>Order Number {order.cart_id}</h2>
                                                <div className="order">
                                                    <div className="order-info">
                                                        <img src={order.image}/>
                                                        <h5>{order.title}</h5>
                                                        <p>{order.price}</p>
                                                    </div>
                                                    <div className="order-actions">
                                                        <button>Refund</button>
                                                        <button>Review</button>
                                                        <button>Invoice</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}