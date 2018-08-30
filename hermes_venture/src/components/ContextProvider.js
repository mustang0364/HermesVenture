import React, { Component } from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

export default class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            quantity: 0,
            orderNumber: null,
            userAddresses: [],
            shipToState: null,
            user: null,
            methods: {
                addToCart: (item) => {
                    let newObj = {
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        quantity: this.state.quantity || 1
                    }
                    for(let i = 0; i < this.state.cart.length; i++) {
                        if(this.state.cart[i].id == newObj.id) {
                            return console.log('Already Exists')
                        }
                    }
                    this.setState((prevState) => ({cart: prevState.cart.concat(newObj)}))
                },
                createOrderNumber: (id) => {
                    axios.post(`/orderNumber/${id}`).then(res => {
                        console.log('order number', res.data[0].id)
                        this.setState({orderNumber: res.data[0].id})
                    })
                },
                handleQuantity: (value) => {
                    this.setState({quantity: value})
                },
                updateQuantity: (item) => {
                    let updateObj = {
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        quantity: +this.state.quantity
                    }
                    console.log('hit update', item.id)
                    let tempCart = [...this.state.cart]
                    for(let i = 0; i < tempCart.length; i++) {
                        if(tempCart[i].id === item.id) {
                            tempCart.splice(i,1)
                            tempCart.push(updateObj)
                            this.setState({cart: tempCart})
                        }
                    }
                },
                handleShipToAddress: (state) => {
                    this.setState({shipToState: state})
                }
            },
        }
    }

    componentDidMount() {
        const cart = JSON.parse(sessionStorage.getItem('cart'))
        if(cart) {
            this.setState({cart})
        }

    }

    componentDidUpdate(prevState) {
        if(this.state.cart.length > 0) {
            if(prevState.cart !== this.state.cart) {
                const cart = JSON.stringify(this.state.cart)
                sessionStorage.setItem('cart', cart)
            }
        }
        axios.get('/getUser').then(res => {
            if(res.data !== 'Not Authorized') {
                this.setState({user: res.data})
            }
        })
    }
    render() {
        return  <AppContext.Provider value={this.state}>
                    {this.props.children}
                </AppContext.Provider>
    }
}