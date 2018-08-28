import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import {Switch, Route} from 'react-router-dom';
import SingleItem from './components/Shopping-Item';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/shopping/:category/:id" component={SingleItem} />
            </Switch>
        );
    }
}

export default Routes