import React from 'react'
import "../../styles/signup.css";


const Signup = () => {
  return (
    <>
    <div className="container">

	<div className="screen">
		<div className="screen__content">
    <i className="fa-brands fa-x-twitter logo" />

			<form className="login">
            <div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="First Name"/>
				</div>
                <div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="Last Name"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-envelope"></i>
					<input type="text" className="login__input" placeholder=" Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password"/>
				</div>
				<button className="button login__submit">
					<span className="button__text">Sign Up </span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
			<h4> Already a User?</h4>
                   <a href="/login"> <div className="login_button">Login</div> </a>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </>
  )
}

export default Signup
