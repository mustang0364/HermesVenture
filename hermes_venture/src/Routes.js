import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import {Switch, Route} from 'react-router-dom';
import SingleItem from './components/Shopping-Item';
import Cart from './components/Cart';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/shopping/:category/:id" component={SingleItem} />
                <Route path="/shopping/cart" component={Cart}/>
            </Switch>
        );
    }
}

export default Routes