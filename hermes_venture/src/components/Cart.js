import React, { Component } from 'react';
import {AppContext} from './ContextProvider';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class Cart extends Component {
    componentDidMount() {
        axios.get('/shopping/cart').then(res => {

        })
    }
    render() {
        return (
            <div>
                <AppContext.Consumer>
                    {(context) => {
                        console.log(context.cart)
                        console.log(context.orderNumber)
                        return (
                            <div>
                                <h1>This is the cart</h1>
                                {context.cart.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <h1>{item.title}</h1>
                                            <img src={item.image}/>
                                            <p>{item.price}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )
                                })}
                                <Checkout 
                                    name="Hermes Venture"
                                    amount={100}
                                    cart={context.cart}
                                    orderNumber={context.orderNumber}
                                />
                            </div>
                        )
                    }}
                </AppContext.Consumer>
            </div>
        );
    }
}

const Checkout = props => {
    const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
    const PAYMENT_SERVER_URL = '/charge';
    let orderInfo = [props.orderNumber, props.cart];
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
        <div>
            <Checkout
                name="Hermes Venture"
                amount={props.amount}
            />
        </div>
    )

}

export default Cart