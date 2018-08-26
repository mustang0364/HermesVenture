import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import {Switch, Route} from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        );
    }
}

export default Routes