import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import SingleItem from './components/Shopping-Item';
import Cart from './components/Cart';
import Shopping from './components/Shopping-Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import OrderHistory from './components/OrderHistory';
import Invoice from './components/Invoice';
import RequestRefund from './components/RequestRefund';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/shopping" exact component={Shopping} />
                <Route path="/shopping/:category/:id" component={SingleItem} />
                <Route path="/shopping/cart" component={Cart}/>
                <Route path="/profile" exact component={Profile} />
                <Route path="/profile/orderhistory" exact component={OrderHistory}/>
                <Route path="/profile/orderhistory/invoice/:id" component={Invoice}/>
                <Route path="/refund/:id" component={RequestRefund}/>
                <Route path="/login" component={Login}/>
            </Switch>
        );
    }
}

export default Routes