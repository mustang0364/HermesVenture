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
                    if(this.state.cart.indexOf(item.id) > 0) {
                        // let index;
                        // index = this.state.cart.findIndex((itemToFind) => {
                        //         return item.id === itemToFind.id
                        // })
                        
                        console.log('Already There')
                    } else {
                        // this.setState((prevState) => {
                        //     return {
                        //         cart: prevState.cart.concat(newObj)
                        //     }
                        // })
                        console.log(item.id)
                        console.log('Not There')
                    }
                },
                updateQuantity: (value) => {
                    this.setState((prevState) => ({quantity: prevState.quantity = Number(value)}))
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