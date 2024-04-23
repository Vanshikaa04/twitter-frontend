import React from 'react'
import "../../styles/signup.css";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';


const Signup = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: onclick
	})
	const navigate = useNavigate()
	const onSubmit = async (data) => {
		console.log(data)
		var signUpData = {
			first_name:data.fname,
			last_name:data.lname,
			email: data.email,
			password: data.password,
		}
		try {
            const response = await axios.post('http://localhost:3000/user/signup', signUpData);
            // is authenticated user
            if (response.status === 201) {
                Cookies.set('token', response.data.data.token, { expires: 1 })  // day expiry
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
					<input type="text" {...register('fname',{required:"First Name is required"})} className="login__input" placeholder="First Name"/>
				</div>
                <div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" {...register('lname',{required:"Last Name is required"})} className="login__input" placeholder="Last Name"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-envelope"></i>
					<input type="text" {...register('email',{required:"Email is required"})} className="login__input" placeholder=" Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" {...register('password',{required:"Password is required"})} className="login__input" placeholder="Password"/>
				</div>
				<button type="submit" className="button login__submit">
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
