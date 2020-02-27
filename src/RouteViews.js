import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './components/Dashboard/HomePage/HomePage';
import Singup from './components/Dashboard/CreateAccount/CreateAccount';
import Singin from './components/Dashboard/Login/Login';

class RouteViews extends Component {
    render() {
        return (
            <div  className="App">
            <Switch>
            <Route path="/" exact  component={HomePage} />
            <Route path="/signup"  component={Singup} />
            <Route path="/signin"  component={Singin} />
            </Switch>
            </div>
        );
    }
}

export default RouteViews;