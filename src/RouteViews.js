/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/Dashboard/HomePage/HomePage";
import CreateAccount from "./components/Dashboard/CreateAccount/CreateAccount";
import Login from "./components/Dashboard/Login/Login";
import LostPassword from "./components/Dashboard/LostPassword/LostPassword";
import SettingsMain from "./components/Dashboard/SettingsMain/SettingsMain";
import TermsandConditions from "./components/Dashboard/TermsandConditions/termsandconditions";
import ResetPassword from "./components/Dashboard/ResetPassword/resetpassword";
import YourApplication from "./components/Dashboard/YourApplication/yourapplication";

class RouteViews extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/Login" component={Login} />
          <Route path="/LostPassword" component={LostPassword} />
          <Route path="/settingsmain" component={SettingsMain} />
          <Route path="/termsandconditions" component={TermsandConditions} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/yourapplication" component={YourApplication} />
        </Switch>
      </div>
    );
  }
}

export default RouteViews;
