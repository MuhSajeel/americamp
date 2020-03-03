
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './components/Dashboard/HomePage/HomePage';
import CreateAccount from './components/Dashboard/CreateAccount/CreateAccount';
import Login from './components/Dashboard/Login/Login';
import LostPassword from './components/Dashboard/LostPassword/LostPassword'

class RouteViews extends Component {
    render() {
        return (

            <div className="App">
            <Switch>
            <Route path="/" exact  component={HomePage} />
            <Route path="/CreateAccount"  component={CreateAccount} />
            <Route path="/Login"  component={Login} />
            <Route path="/LostPassword"  component={LostPassword} />
            </Switch>
            </div>
        );
    }
}

export default RouteViews;