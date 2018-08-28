import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Dashboard from './components/Dashboard.js';
import Home from './components/Home.js';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();

    this.state = {
      redirect: false,
      products: [],
    }
  }
  componentDidMount() {
    axios.get('/dashboard').then(res => {
        this.setState({products: res.data})
    })
}
  redirect = () => {
    this.setState({
        redirect: true,
    })
}

  render() {
    console.log(this.state.redirect)
    return (
      <div className='appmain'>
      {this.state.redirect 
      ? <Routes /> 
      : <div><Home /> <Dashboard needsRedirect={this.state.redirect} products={this.state.products} redirect={this.redirect} /> <Routes /></div>
      }
      </div>
    );
  }
}

export default App;
