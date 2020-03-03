/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './LostPassword.css';
import HeaderImage from '../../HeaderImage/Header_Image';

export class LostPassword extends Component {
    render() {
        return (
            <div>
            <HeaderImage />
            <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4 lostpassword"> 
            <p className="lostpasswordheading">
            <b className="display-3 lostpassword_heading">Did you lose your password? </b>
            </p>            
            <form className="createaccountform">
                <div className="form-group">
                    <label className="lostpassword_label1">We hate losing stuff too. Let’s get this sorted!</label>
                </div>
                <div className="form-group">
                    <label className="lostpassword_label2">Enter your email address<span className="required">*</span></label>
                    <input type="email" className="form-control" name="email" autocomplete="off" required></input>
                </div>
                <button type="submit" className="button_cont btnlostpassword">
                    Submit
                    <i className="fa fa-angle-right float-right fa-lg"></i>
                </button>
            </form>
            </div>
            
            <div className="col-md-2"></div>
            <div className="col-md-5 lostpasswordimage">
                <img src="https://dummyimage.com/600x500/000000/fff"/>
            </div>
        </div>
        </div>
        )
    }
}

export default LostPassword
