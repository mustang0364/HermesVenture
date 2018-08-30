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
            this.props.history.push('/shopping')
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

   handleStreet = (input) => {
        this.setState({
            streetInput: input,
        })
   }
   handleCity = (input) => {
        this.setState({
            cityInput: input,
        })
   }
   handleState = (input) => {
        this.setState({
            stateInput: input,
        })
   }
   handleZip = (input) => {
        this.setState({
            zipInput: input,
        })
   }
   updateAddress = (data) => {
       this.setState({
           userAddress: data
       })
       axios.post()
   }
//    addAddress = () => {
       
//    }
    render(){
console.log(this.state.userAddress[0])
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
                                {this.state.userAddress == '' 
                                ? <div className="needsmoreinfo">
                                    <h1>Please add an address to your profile</h1>
                                    <div><input onClick={(e) => this.handleStreet(e.target.value)} placeholder='Enter Street'/></div>
                                    <div><input onClick={(e) => this.handleCity(e.target.value)} placeholder='Enter City'/></div>
                                    <div><input onClick={(e) => this.handleState(e.target.value)} placeholder='Enter State'/></div>
                                    <div><input onClick={(e) => this.handleZip(e.target.value)} placeholder='Enter Zip'/></div>
                                    <div><button onClick={() => this.updateAddress()}>Add This Address</button></div>
                                </div>
                                : <div className="addresses">
                                <h1>Addresses:</h1>
                                {this.state.userAddress.map(e => {
                                    return <div key={e.street}>{e.street + ' ' + e.city + ', ' + e.state + ' ' + e.zip}</div>             
                                })}
                                <button onClick={() => this.addAddress()}>Add A New Address</button>
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