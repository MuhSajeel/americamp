import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from '../Pages/HomePage';
import Singin from '../Pages/Signin';

class RouteViews extends Component {
    render() {
        return (
            <div  className="App">
            <Switch>
            <Route path="/" exact  component={HomePage} />
            <Route path="/signin"  component={Singin} />
            </Switch>
            </div>
        );
    }
}

export default RouteViews;