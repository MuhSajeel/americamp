/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import axios from 'axios'
import './Login.css';
import HeaderImage from '../../HeaderImage/Header_Image';
import {Link} from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email:'',
            password:''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleEmailChange (evt) {
        this.setState({ email: evt.target.value });
      }
      
    handlePasswordChange (evt) {
        this.setState({ password: evt.target.value });
      }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    submithandler = e => {        
        e.preventDefault()
        console.log(this.state)
        axios.post('http://americamp-dev.attribes.com/api/v1/users/signin',this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
            <HeaderImage />
            <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4 login"> 
            <p className="loginheading">
            <b className="display-3 login_heading">Login to your AmeriCamp account </b>
            </p>            
            <form className="createaccountform" onSubmit={this.submithandler}>
                <div className="form-group">
                    <label className="login_label">Email address<span className="required">*</span></label>
                    <input type="email" className="form-control" name="email" onChange={this.handleEmailChange} autocomplete="off" required></input>
                </div>
                <div className="form-group">
                    <label className="login_label">Password<span className="required">*</span></label>
                    <input type="password" className="form-control" name="password" onChange={this.handlePasswordChange} required></input>
                </div>
                <Link to="/LostPassword">
                <p><a href="#" className="lostpwd">Lost Password</a></p>
                </Link>
                <button type="submit" className="button_cont btnlogin">
                    Login
                    <i className="fa fa-angle-right float-right fa-lg"></i>
                </button>
            </form>
            </div>
            
            <div className="col-md-2"></div>
            <div className="col-md-5 loginimage">
                <img src="https://dummyimage.com/600x500/000000/fff"/>
            </div>
        </div>
        </div>
        )
    }
}

export default Login
