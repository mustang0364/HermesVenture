import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import {Switch, Route} from 'react-router-dom';
import Shopping from './components/Shopping-Dashboard';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/shopping/:id" component={Shopping} />
            </Switch>
        );
    }
}

export default Routes