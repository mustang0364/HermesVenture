import React, { Component } from 'react';
import Navbar from './Shopping-Navbar';
import './shopping-item.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
class Item extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            related: null,
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.category)
        axios.get(`/shopping/${this.props.match.params.category}/${this.props.match.params.id}`).then(res => {
            this.setState({product: res.data[0], related: res.data[1]})
            
        })
    }
    render() {
        const { product, related } = this.state
        console.log(this.state)
        return (
            <div>
                <Navbar />
                {this.state.product ?
                    <div className="single-item-container">
                        <div className="single-item-info-container">
                            <div className="single-item-img">
                                <img src={product.image} />
                            </div>
                            <div className="single-item-info">
                                <h1>{product.title}</h1>
                                <h1>${product.price}</h1>
                                <h4>Free Shipping</h4>
                                <h3>Quantity</h3>
                                <p><button>Add To Cart</button></p>
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
                                            <div>
                                                <Link to="#"><img src={item.image}/></Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            : null}
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}

export default Item