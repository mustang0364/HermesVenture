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

                    if(this.state.cart.length === 0) {
                        this.setState((prevState) => ({cart: prevState.cart.concat(newObj)}))
                    } else if(this.state.cart.filter((item) => {
                        console.log(item.id, newObj.id)
                        item.id === newObj.id
                    })) {
                        console.log('Already Exists')
                    } else {
                        this.setState((prevState) => ({cart: prevState.cart.concat(newObj)}))
                    }
                },
                // updateQuantity: (id, value) => {
                //     this.setState({quantity: Number(value)})
                //     console.log(id, value)
                //     if(this.state.cart.length > 0 ) {
                //         let index;
                //         this.state.cart.map((item, i) => {
                //             if(item.id === id) {
                //                 index = i
                //             }
                //             return null
                //         })
                //         let update = Object.assign({}, this.state.cart[index])
                //         let copyCart = [...this.state.cart]
                //         copyCart[index].quantity = Number(value)
                //         this.setState({cart: copyCart})
                //     }
                // },
                createOrderNumber: (id) => {
                    axios.post(`/orderNumber/${id}`).then(res => {
                        console.log('order number', res.data[0].id)
                        this.setState({orderNumber: res.data[0].id})
                    })
                },
                handleQuantity: (value) => {
                    this.setState({quantity: value})
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
                console.log('session storage hit')
                sessionStorage.setItem('cart', cart)
            }
        }
    }
    render() {
        return  <AppContext.Provider value={this.state}>
                    {this.props.children}
                </AppContext.Provider>
    }
}