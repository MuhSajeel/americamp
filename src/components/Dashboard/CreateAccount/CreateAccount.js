/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './CreateAccount.css';
import HeaderImage from '../../HeaderImage/Header_Image';

export class CreateAccount extends Component {
    render() {
        return (
            <div>
                <HeaderImage />
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-4 createaccount"> 
                <h1 className="account_heading">Create your<br/> AmeriCamp Account</h1>
                <form>
                    
                    <div className="form-group">
                        <label className="createaccount_label">First name<span className="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Last name<span className="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Email address<span className="required">*</span></label>
                        <input type="email" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Password<span className="required">*</span></label>
                        <input type="password" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Password again<span className="required">*</span></label>
                        <input type="password" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                    <label className="createaccount_label">What country are you applying from?<span class="required">*</span></label>
                        <select className="form-control">
                            <option value="">Choose one</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                    <button type="button" className="button_cont btnlogin">
                        Login
                        <i className="fa fa-angle-right float-right fa-lg"></i>
                    </button>
                </form>
                </div>
                
                <div className="col-md-2"></div>
                <div className="col-md-5 image">
                <img src="https://dummyimage.com/600x500/000000/fff"/>
                <img className="logo1" src="Assets/Logos/AC logo.png" />
                <img className="logo2" src="Assets/Logos/Poweredbytea_biscuits.png" />
                </div>
            </div>
            </div>
        )
    }
}

export default CreateAccount
