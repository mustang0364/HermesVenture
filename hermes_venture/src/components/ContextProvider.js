import React, { Component } from 'react';

export const AppContext = React.createContext();

export default class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            methods: {
                addToCart: (item) => {
                    let newObj = {
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        quantity: 1
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
                        this.setState((prevState) => ({cart: prevState.cart.slice(index,1)}))
                        update.quantity = Number(value)
                        this.setState((prevState) => ({cart: prevState.cart.concat(update)}))
                    }
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