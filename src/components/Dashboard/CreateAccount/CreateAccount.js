/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './CreateAccount.css';

export class CreateAccount extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-4 createaccount"> 
                <h1 className="account_heading">Create your<br/> AmeriCamp Account</h1>
                <form>
                    
                    <div className="form-group">
                        <label className="createaccount_label">First name<span class="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Last name<span class="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Email address<span class="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Password<span class="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                        <label className="createaccount_label">Password again<span class="required">*</span></label>
                        <input type="text" className="form-control" required></input>
                    </div>
                    <div className="form-group">
                    <label className="createaccount_label">What country are you applying from?<span class="required">*</span></label>
                        <select class="form-control">
                            <option value="">Choose one</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                    <button type="button" class="button_cont btnlogin">
                        Login
                        <i class="fa fa-angle-right float-right fa-lg"></i>
                    </button>
                </form>
                </div>
                
                <div className="col-md-3"></div>
                <div className="col-md-4"></div>
            </div>
        )
    }
}

export default CreateAccount
