import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './resetpassword.css';
import Sidepanel from '../../SidePanel/sidepanel'
import ResponsiveHeader from '../../ResponsiveHeader/responsiveheader'
export class resetpassword extends Component {

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
                <b className="display-3 setting_heading">Settings</b>
                </p> 
                </div>
            </div>    

            <Sidepanel/>
            <div className="col-md-1"></div>
            <div className="col-md-7">

            <p className="welcome">Reset Password</p>

            <form className="createaccountform formgroup">
            <div className="form-group row">
                <div className="form-group col-md-6">
                    <label className="label1">Enter new password<span className="required">*</span></label>
                    <input type="password" className="form-control" name="password" required></input>
                </div>
                <div className="form-group col-md-6"> </div>
                <div className="form-group col-md-6">
                    <label className="label1">Confirm new password<span className="required">*</span></label>
                    <input type="password" className="form-control" name="cnfrmpass" required></input>
                </div>
                <div className="form-group col-md-6"> </div>
            </div>

            
            <p><label className="label2">Forgotten password</label></p>
            <p><label className="label2"><Link to="/LostPassword" className="required">Click here</Link> to resend</label></p>

                <Link to="/settingsmain" className="backcont backbtn">
                    <span>Back</span>
                    <i className="fa fa-angle-left float-left fa-lg"></i>
                </Link>
                <button type="submit" className="submit_cont btnsubmit">
                    <span>Submit</span>
                    <i className="fa fa-angle-right float-right fa-lg"></i>
                </button>
                
            </form>
            </div>
        </div>
        )
    }
}

export default resetpassword
