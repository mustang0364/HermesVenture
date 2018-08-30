import React, { Component } from 'react';
import ShoppingNavbar from './Shopping-Navbar';

export default class Profile extends Component {
    constructor(){
        super();

        this.state = {
            user: [],
            userAddress: [],
        }
    }
    
    componentDidMount() {
    axios.get('/getUser').then(res => {
        if(res.data !== 'Not Authorized') {
            this.setState({user: res.data})
        } else {
            this.props.history.push('/shopping')
        }
    })
    axios.get('/getaddress').then(res => {
        this.setState({
            userAddress: res.data,
        })
    })
}
    render(){

        return (
            <div className="profilemain">
                <ShoppingNavbar />
                <div className="userinfo">
                {this.state.user.name}
                {this.state.user.email}
                {this.state.userAddress == '' 
                ? <div className="needsmoreinfo">
                    <input>Address</input>
                    <button>Add Address</button>
                  </div>
                : this.state.userAddress}
                </div>
            </div>
        );
    }
}
