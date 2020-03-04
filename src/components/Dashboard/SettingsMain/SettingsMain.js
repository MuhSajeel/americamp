/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './SettingsMain.css';
import { Link } from 'react-router-dom';
import Sidepanel from '../../SidePanel/sidepanel'
import ResponsiveHeader from '../../ResponsiveHeader/responsiveheader'
export class SettingsMain extends Component {
   
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
                <div className="col-md-7">
                    <div className="whitebg">
                        <div className="row">
                        <div className="col-md-7 maincontent1 resp1">
                        <b className="resetpass">Reset Password</b>
                        </div>
                        <div className="col-md-5 maincontent2">
                        <Link to="/LostPassword" className="view_cont btnview">
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
                        <Link to="/LostPassword" className="view_cont btnview">
                         View
                        <i className="fa fa-angle-right float-right fa-lg"></i>
                        </Link>
                        </div>
                        </div>
                    </div>
                    <Link to="/LostPassword" className="back_cont btnback">
                        <span>Back</span>
                        <i className="fa fa-angle-left float-left fa-lg"></i>
                    </Link>
                    
                </div>
            </div>
        )
    }
}

export default SettingsMain
