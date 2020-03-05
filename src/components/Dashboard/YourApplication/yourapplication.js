/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React, { Component } from 'react'
import './yourapplication.css';
import Sidepanel from '../../SidePanel/sidepanel';
import {Link} from "react-router-dom";
import ResponsiveHeader from '../../ResponsiveHeader/responsiveheader'
export class yourapplication extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
        <div className="row">
            <ResponsiveHeader/>
            <div className="col-md-12">
                <div className="settings">
                <p className="settingsheading">
                <b className="display-3 setting_heading">Your Application</b>
                </p> 
                </div>
            </div>    

            <Sidepanel/>
            <div className="col-md-1"></div>
            <div className="col-md-7 yourapp">
                <div class="row">
                    <div class="col-md-6">
                        
                        <b class="welcome">Let’s Get Started! </b>
                        <div className="appprogress"><b class="application-progress">Application Progress</b></div>
                    </div>
                
                    <div class="col-md-6">
                        <Link class="view_cont_big btnview btnapp btnstart">
                        Start your Application
                    <i class="fa fa-angle-right float-right fa-lg"></i>
                    </Link>
                    </div>
                    
                    <div class="col-md-10">0%
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="70"
                                aria-valuemin="0" aria-valuemax="100">
                                
                                </div>
                            </div>
                            <div className="appprogress"><b class="application-progress">Application Status</b>
                            <p>Not Started</p></div>
                    </div>
                    <div className="col-md-2"></div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <div className="box">
                            <b class="application-progress">Balanced Due</b>
                            <h4><span class="required">£0</span> | £248 remaining</h4>
                            <Link class="view_cont_big btnview btnapp btn1">
                                Pay Balance
                            <i class="fa fa-angle-right float-right fa-lg"></i>
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div className="box">
                            <b class="application-progress">Documents</b>
                            <Link class="view_cont_big btnview btnapp btn2">
                               View
                            <i class="fa fa-angle-right float-right fa-lg"></i>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="row redboxes">
                        <div className="red-box">
                            <img className="redboxicon1" src="Assets/Icons/important info.png" />
                            <p>Important Info</p>
                        </div>
                        <div className="red-box">
                            <img className="redboxicon2" src="Assets/Icons/why americamp.png" />
                            <p>Why AmeriCamp?</p>
                        </div>
                        <div className="red-box">
                            <img className="redboxicon3" src="Assets/Icons/contact us.png" />
                            <p>Contact Us</p>
                        </div>
                        <div className="red-box">
                            <img className="redboxicon4" src="Assets/Icons/referrals.png" />
                            <p>Referrals</p>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>

        )
    }
}

export default yourapplication
