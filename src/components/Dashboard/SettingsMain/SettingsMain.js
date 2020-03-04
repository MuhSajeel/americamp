/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './SettingsMain.css';
import { Link } from 'react-router-dom';
import Sidepanel from '../../SidePanel/sidepanel'
export class SettingsMain extends Component {
   
    render() {
        return (
            <div className="row">
                <div className="col-md-12 onlyforresponsive">
                    <div className="welcomeresp"><span className="welcomeresphead">Welcome Applicant name!</span></div>
                    
                    <nav class="navbar-inverse">
                        <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>                        
                        </button>
                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Log Out</a></li>
                        </ul>
                        </div>
                    </nav>
                    <img className="starimg" src="Assets/Stars/AC stars.png" />
                    <img className="profile-img" src="Assets/Icons/profile-image-png-10.png" />
                </div>
                <div className="col-md-12">
                    <div className="settings">
                    <p className="settingsheading">
                    <b className="display-3 setting_heading">Settings</b>
                    </p> 
                    </div>
                </div>    
                <div className="col-md-2 sidepanel">
                <Sidepanel/>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-7">
                    <div className="whitebg">
                        <div className="row">
                        <div className="col-md-7 maincontent1 resp1">
                        <b className="resetpass">Reset Password</b>
                        </div>
                        <div className="col-md-5 maincontent2">
                        <Link className="view_cont btnview">
                         View
                        <i className="fa fa-angle-right float-right fa-lg"></i>
                        </Link>
                        </div>
                        </div>
                    </div>
                    <div className="whitebg">
                        <div className="row">
                        <div className="col-md-7 maincontent1 resp2">
                        <b className="resetpass">View Terms and Conditions</b>
                        </div>
                        <div className="col-md-5 maincontent2">
                        <Link className="view_cont btnview">
                         View
                        <i className="fa fa-angle-right float-right fa-lg"></i>
                        </Link>
                        </div>
                        </div>
                    </div>
                    <Link className="back_cont btnback">
                        <span>Back</span>
                        <i className="fa fa-angle-left float-left fa-lg"></i>
                    </Link>
                    
                </div>
            </div>
        )
    }
}

export default SettingsMain
