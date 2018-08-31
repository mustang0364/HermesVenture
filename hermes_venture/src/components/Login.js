import React, { Component } from 'react';
import Navbar from './Shopping-Navbar'
import {AppContext} from './ContextProvider';

export default class Login extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <div>
                            <Navbar cart={context.cart}/>
                            <div>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                                <h1>This is the login page.</h1>
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}