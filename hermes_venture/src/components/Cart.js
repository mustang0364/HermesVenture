import React, { Component } from 'react';
import {AppContext} from './ContextProvider';
import './cart.css'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Navbar from './Shopping-Navbar';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            addresses: [],
            shipToAddress: [],
        }
    }
    componentDidMount() {
        axios.get('/getUser').then(res => {
            if(res.data !== 'Not Authorized') {
                axios.get(`/getaddress/${res.data.id}`).then(response => {
                    this.setState({
                        user: res.data,
                        addresses: response.data
                    })
                })
            } else {
                this.props.history.push('/shopping')
            }
        })
    }

    shiptoAddress(id, street) {
        this.setState({
            shipToAddress: [id, street]
        })
    }
    render() {
        console.log(this.state)
        return (
            this.state.user ? 
                <AppContext.Consumer>
                    {(context) => {
                        if(context.cart.length > 0) {
                        let price = context.cart.map((item) => (item.price) * item.quantity).reduce((a,b) => a + b)
                        let taxes = price * .062
                        let grandTotal = price + taxes
                        return (
                            <div className="cart-container">
                                <Navbar cart={context.cart}/>
                                <div className="cart">
                                    <h1>Your Cart</h1>
                                    {context.cart.map((item) => {
                                        return (
                                            <div key={item.id} className="cart-item-container">
                                                <h2 id="item-title">{item.title}</h2>
                                                <img src={item.image}/>
                                                <p id="item-price">${item.price}</p>
                                                <p id="item-quantity">{item.quantity}</p>
                                                <p><i className="far fa-trash-alt"></i></p>
                                                <input type="number" placeholder="Update Quantity?" onChange={(e) => context.methods.handleQuantity(e.target.value)}/>
                                                <p><i className="fas fa-check" onClick={() => context.methods.updateQuantity(item)}></i></p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="checkout-container">
                                    <div className="address-container">
                                    {this.state.addresses.map((address) => {
                                        return (
                                            <div>
                                               <p>{address.street}, {address.city} <button onClick={() => this.shiptoAddress(address.addressid, address.street)}>Select</button></p>
                                            </div>
                                        )
                                    })}
                                    {this.state.shipToAddress ?
                                        <h4>Ship To Address: {this.state.shipToAddress[1]}</h4>
                                    : null}
                                    </div>
                                    <h1>Subtotal ${price}</h1>
                                    <h1>Taxes ${taxes}</h1>
                                    <h1>Total ${grandTotal}</h1>
                                    {this.state.shipToAddress.length > 0 ?
                                    <Checkout 
                                            name="Hermes Venture"
                                            amount={grandTotal}
                                            cart={context.cart}
                                            orderNumber={context.orderNumber}
                                            address={this.state.shipToAddress[0]}
                                    />
                                    : null}
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div >
                                <Navbar cart={context.cart}/>
                                <h1 className="cart-empty-h1">Oh no! Your Cart is Empty!</h1>
                            </div>
                        )
                    }
                    }}
                </AppContext.Consumer>
            : null
        );
    }
}

const Checkout = props => {
    const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
    const PAYMENT_SERVER_URL = '/charge';
    let orderInfo = [props.orderNumber, props.cart, props.address];
    const CURRENCY = "USD";
    const fromUSDToCent = amount => amount * 100;

    const successPayment = data => {
        axios.post('/createOrder', orderInfo)
        console.log('Payment Successful')
    }
    const errorPayment = data => {
        console.log('Payment Error', data)
    }

    const onToken = amount => token =>
    axios.post(PAYMENT_SERVER_URL,
        {
            source: token.id,
            currency: CURRENCY,
            amount: fromUSDToCent(amount)
        }
    ).then(successPayment).catch(errorPayment);
    
    const Checkout = ({name, description, amount}) => 
    <StripeCheckout
        name={name}
        description={description}
        amount={fromUSDToCent(amount)}
        token={onToken(amount)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
    />
    return (
        <div id="stripe-button">
            <Checkout
                name="Hermes Venture"
                amount={props.amount}
            />
        </div>
    )

}

export default Cart