import React from 'react'
import "../../styles/login.css";


import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import axios from 'axios';



export const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: onclick
	})
	const navigate = useNavigate()
	const onSubmit = async (data) => {
		console.log("data from form  ->",data);
		var loginData = {};
		loginData.email = data.email;
		loginData.password = data.password;
		try {
            const response = await axios.post('http://localhost:3008/user/login', loginData);
            // is authenticated user
            if (response.status === 200) {
				console.log("response",response.data.data.token)
                Cookies.set('token', response.data.data.token, { expires: 1 }) 
				navigate("/home")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
	}
	return (
		<>
			<div className="container">
				<div className="screen">
					<div className="screen__content">
						<i className="fa-brands fa-x-twitter logo" />

						<form onSubmit={handleSubmit(onSubmit)} className="login">
							<div className="login__field">
								<i className="login__icon fas fa-user"></i>
								<input type="text" {...register('email', { required: 'Email is required' })} className="login__input" placeholder="Email" />
								{errors.email && <p>{errors.email.message}</p>}
							</div>
							<div className="login__field">
								<i className="login__icon fas fa-lock"></i>
								<input type="password" {...register('password', { required: 'Password is required' })} className="login__input" placeholder="Password" />
								{errors.password && <p>{errors.password.message}</p>}
							</div>
							<button type="submit" className="button login__submit">
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

