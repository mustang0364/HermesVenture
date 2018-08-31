import React, { Component } from 'react';
import ShoppingNavbar from './Shopping-Navbar';
import axios from 'axios';
import {AppContext} from './ContextProvider';
import './profile.css';

class Profile extends Component {
    constructor(){
        super();

        this.state = {
            user: null,
            showMessage: false,
            userAddress: '',
            streetInput: '',
            cityInput: '',
            zipInput: '',
            stateInput: '',
        }
    }
    
componentDidMount() {
    axios.get('/getUser').then(res => {
        if(res.data !== 'Not Authorized') {
            this.setState({user: res.data})
            this.getAddress();
        } else {
            this.props.history.push('/login')
        }
    })   
}

  getAddress = () => {
    this.state.user ? 
    setTimeout(() => {
        axios.get(`/getaddress/${this.state.user.id}`).then(res => {
            this.setState({
                userAddress: res.data,
            })
        }) 
    }, 500)
    : null
  }

   handleInput = (key, input) => {
       this.setState({
           [key]: input
       })
   }
   addAddress = () => {
       axios.post('/createaddress', {...this.state}).then( res => {
            this.setState({
                userAddress: res.data,
            })
       })
       this.setState({showMessage: true})
       this.getAddress();
    }
   updateAddress = () => {
       axios.post('/createaddress', {...this.state}).then( res => {
            this.setState({
                userAddress: res.data,
            })
       })
       this.getAddress();
    }
    removeAddress = (id, addressid) => {
        axios.delete(`/removeaddress/${id}/${addressid}`);
        this.getAddress();
    }
   updateAddressShown = () => {
       this.setState({
           userAddress: '',
       })
    }

    render(){
        return (
                this.state.user ? 
            <AppContext.Consumer>
                {(context) => {         
                    return (
                        <div className="profilemain">
                            <ShoppingNavbar cart={context.cart}/>
                                <div className="userinfo">
                                <h1>Welcome</h1>
                                <h1>{this.state.user.name}</h1>
                                <h1>{this.state.user.email}</h1>            
                                {this.state.userAddress == '' && !this.state.showMessage
                                ? <div className="needsmoreinfo">
                                    <h1>Please add an address to your profile</h1>
                                    <div><input onChange={(e) => this.handleInput('streetInput', e.target.value)} placeholder='Enter Street'/></div>
                                    <div><input onChange={(e) => this.handleInput('cityInput', e.target.value)} placeholder='Enter City'/></div>
                                    <div><input onChange={(e) => this.handleInput('stateInput', e.target.value)} placeholder='Enter State'/></div>
                                    <div><input onChange={(e) => this.handleInput('zipInput', e.target.value)} placeholder='Enter Zip'/></div>
                                    <div><button onClick={() => this.addAddress()}>Add This Address</button></div>
                                </div>
                                : this.state.userAddress == '' && this.state.showMessage 
                                ? <div><h1>Your Address Has Been Stored Succesfully</h1>
                                {this.state.userAddress ? this.state.userAddress.map(e => {
                                    let addressid = e.addressid;
                                    return <div key={addressid}>{e.street + ' ' + e.city + ', ' + e.state + ' ' + e.zip}
                                    <button onClick={() => this.removeAddress(this.state.user.id, addressid)}>Remove Address</button>
                                    </div>})
                                : null}
                                </div>
                                : <div className="addresses">
                                <h1>Addresses:</h1>
                                {this.state.userAddress ? this.state.userAddress.map(e => {
                                    let addressid = e.addressid;
                                    return <div key={addressid}>{e.street + ' ' + e.city + ', ' + e.state + ' ' + e.zip}
                                    <button onClick={() => this.removeAddress(this.state.user.id, addressid)}>Remove Address</button>
                                    </div>             
                                }) : null}
                                <button onClick={() => this.updateAddressShown()}>Add A New Address</button>
                                </div>
                                }
                                </div>
                            </div>        
                        )        
                    }}
            </AppContext.Consumer>
                    : null
        );
    }
}
export default Profile;