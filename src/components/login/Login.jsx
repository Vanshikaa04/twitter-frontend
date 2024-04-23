/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import "../../styles/login.css";


import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate= useNavigate()
  return (
    <>
    <div className="container">

	<div className="screen">
		<div className="screen__content">
    <i className="fa-brands fa-x-twitter logo" />

			<form className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password"/>
				</div>
				<button className="button login__submit" onClick={()=>{navigate('/home')}}>
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social_login">
				<h4>log in via</h4>
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-google"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div>
                <div className="signup_form">
                   <h4> Not a User?</h4>
                   <a href="/signup"> <div className="signup_button">Sign Up</div> </a>
                    </div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape5"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </>
  )
}

export default Login
