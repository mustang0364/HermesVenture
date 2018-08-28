import React, { Component } from 'react';
import Navbar from './Shopping-Navbar';
import './shopping-item.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {AppContext} from './ContextProvider';
class Item extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            related: null,
        }
    }

    componentDidMount() {
        axios.get(`/shopping/${this.props.match.params.category}/${this.props.match.params.id}`).then(res => {
            this.setState({product: res.data[1], related: res.data[0]})
        })
    }
    render() {
        const { product, related } = this.state
        return (
            <div>
                <AppContext.Consumer>
                    {(context) => {
                        return (
                            <div>
                                <Navbar cart={context.cart}/>
                                {this.state.product ?
                                    <div className="single-item-container">
                                        <div className="single-item-info-container">
                                            <div className="single-item-img">
                                                <img src={product.image} alt="product"/>
                                            </div>
                                            <div className="single-item-info">
                                                <h1>{product.title}</h1>
                                                <h1>${product.price}</h1>
                                                <h4>Free Shipping</h4>
                                                <h3>Quantity <input type="number" onChange={(e) => context.methods.updateQuantity(product.id, e.target.value)}/></h3>
                                                <p><button onClick={() => context.methods.addToCart(product)}>Add To Cart</button></p>
                                                <p><button>Future Stripe button</button></p>
                                             </div>
                                        </div>
                                        <div className="single-item-description">
                                            <h1>{product.title}</h1>
                                            {product.description}
                                        </div>
                                        <div>
                                        <h2>Related Products</h2>
                                            {related ?
                                                <div  className="related-img-container">
                                                
                                                    {related.map((item) => {
                                                        return (
                                                            <div key={item.id}>
                                                                <Link to="#"><img src={item.image} alt="shopping-item"/></Link>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            : null}
                                        </div>
                                    </div>
                                : null}
                            </div>
                        )
                    }}
                </AppContext.Consumer>
            </div>
        );
    }
}

export default Item