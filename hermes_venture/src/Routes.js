import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import SingleItem from './components/Shopping-Item';
import Cart from './components/Cart';
import Shopping from './components/Shopping-Dashboard';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/shopping" exact component={Shopping} />
                <Route path="/shopping/:category/:id" component={SingleItem} />
                <Route path="/shopping/cart" component={Cart}/>
            </Switch>
        );
    }
}

export default Routes