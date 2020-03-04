/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './termsandconditions.css';
import Iframe from 'react-iframe';
import Sidepanel from '../../SidePanel/sidepanel';
import ResponsiveHeader from '../../ResponsiveHeader/responsiveheader';
export class termsandconditions extends Component {
    render() {
        return (
            <div className="row">
            <ResponsiveHeader/>
            <div className="col-md-12">
                <div className="settings">
                <p className="settingsheading">
                <b className="display-3 setting_heading">Settings</b>
                </p> 
                </div>
            </div>    

            <Sidepanel/>
            <div className="col-md-1"></div>
            <div className="col-md-7 terms">

            <p className="welcome">Terms and Conditions</p>
            <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                            width="700px"
                            height="550px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                            allowFullScreen/>
            <Link to="/settingsmain" className="backcont backbtn">
                    <span>Back</span>
                    <i className="fa fa-angle-left float-left fa-lg"></i>
            </Link>
            <button type="submit" className="submit_cont btnsubmit">
                    <span>Submit</span>
                    <i className="fa fa-angle-right float-right fa-lg"></i>
            </button>
                
            </div>
        </div>
        )
    }
}

export default termsandconditions

