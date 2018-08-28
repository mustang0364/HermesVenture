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
                        quantity: this.state.quantity || 0
                    }
                    if(this.state.cart.length < 1) {
                        this.setState((prevState) => ({cart: prevState.cart.concat(newObj)}))
                    } else {
                        for(let i = 0; i < this.state.cart.length; i++) {
                            if(this.state.cart[i].id === newObj.id) {
                                console.log('already exists')
                            }
                        }
                    }
                },
                updateQuantity: (id, value) => {
                    this.setState({quantity: Number(value)})
                    console.log(id, value)
                    if(this.state.cart.length > 0 ) {
                        let index;
                        this.state.cart.map((item, i) => {
                            if(item.id === id) {
                                index = i
                            }
                            return null
                        })
                        let update = Object.assign({}, this.state.cart[index])
                        let copyCart = [...this.state.cart]
                        copyCart[index].quantity = Number(value)
                        this.setState({cart: copyCart})
                    }
                },
                createOrderNumber: (id) => {
                    axios.post(`/orderNumber/${id}`).then(res => {
                        console.log('order number', res.data[0].id)
                        this.setState({orderNumber: res.data[0].id})
                    })
                }
            },
        }
    }
    render() {
        console.log(this.state)
        return  <AppContext.Provider value={this.state}>
                    {this.props.children}
                </AppContext.Provider>
    }
}