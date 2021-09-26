import React, { Component } from 'react';
import './style.css';
import loginImg from '../../source/guy.svg'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
	state = {
		loginActive: true,
		registerActive: false,
		loginContent: ["email","password"],
		registerContent: ["name","email","password"],
		name: "",
		email: "",
		password: "",
		showModal:false,
		modalContent: "",
		redirect: null,
	}

	changeIt(isLogin) {
		this.setState({
			loginActive: isLogin ? true : false,
			registerActive: isLogin ? false : true,
			name: "",
			email: "",
			password: ""
		})
	}

	onChange(e, item) {
		if(item === "name") {
			this.setState({
				name: e.target.value
			})
		}
		if(item === "email") {
			this.setState({
				email: e.target.value
			})
		}
		if(item === "password") {
			this.setState({
				password: e.target.value
			})
		}
	}

	onSubmit = async () => {
		const email = this.state.email;
		const password = this.state.password;
		const name = this.state.name;

		if(this.state.loginActive) {
			await axios
				.get('/users/find', {
					params: {
						email: email,
						password: password
					}
			})
			.then((res) => {
				if(res.data.isThere === true){
					this.setState({ redirect: '/newsletter-editor' });
				} else {
					this.setState({
						showModal: true,
						modalContent: 'No account with these credentials'
					})
				}
			})
			.catch((err) => console.log(err));
		} else {
			const newUser = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			};

			let isEmpty = false;

			if(newUser.name==="" || newUser.password==="" || newUser.email===""){
				isEmpty = true;
			}

			let isAlreadyThere = false;

			await axios
				.get('/users/find', {
					params: {
						email: newUser.email,
						password: newUser.password
					}
				})
				.then((res) => {
					if(res.data.isThere){
						isAlreadyThere=true;
						this.setState({
							showModal: true,
							modalContent: 'An account is already there with same credentials'
						})
					}
				})
				.catch((err) => console.log(err));

			if(!isEmpty && !isAlreadyThere) {

				this.setState({
					showModal: true,
					modalContent: 'Account successfully registered'
				})

				await axios
					.post('/users/add', newUser)
					.then((res) => {
						console(res.data)
					});
			}
		}
	}

	handleClose() {
		this.setState({
			showModal: false,
			modalContent: ""
		})
	}

	render(){

		if(this.state.redirect){
			return <Redirect to={this.state.redirect} />
		}

		let showModal = this.state.showModal ? "modal display-block" : "modal display-none";
		let modalContent = this.state.modalContent;
		let register_class = this.state.registerActive ? "button register-active" : "button register-inactive";
		let login_class = this.state.loginActive ? "button login-active" : "button login-inactive";
		let input_content = this.state.loginActive ? this.state.loginContent : this.state.registerContent;
		let submitContent = this.state.loginActive ? "Login" : "Register";
		

		let itemValues = {
			'name' : this.state.name,
			'email' : this.state.email,
			'password' : this.state.password
		}
		const inputItems = input_content.map((item) => 
			<div className="input">
				<label className="input-content input-label">{item}</label>
				<input className="input-content input-box" value={itemValues[item]} type={item === "password" ? item : 'text'} placeholder={item} onChange={e => this.onChange(e,item)}/>
			</div>
			);


		console.log(this.state.showModal);

		return (
			<div className="body">

				<div className={showModal}>
					<div className="modal-content modal-main">
						{modalContent}
						<button className="modal-content close-button" type="button" onClick={() => {this.handleClose()}}>
							CLOSE
						</button>
					</div>
				</div>

				<div className="row">
					<div className="col-5 left-side">
						<div className="login-register--box">
							<a className={login_class} href="#" onClick={() => {this.changeIt(true)}}>Login</a>
							<a className={register_class} href="#" onClick={() => {this.changeIt(false)}}>Register</a>
							<div className="form-group">
								{inputItems}
							</div>
							<div className="submit-button">
								<a className="submit" href="#" onClick={() => {this.onSubmit()}}>{submitContent}</a>
							</div>
						</div>
					</div>
					<div className="col-7 right-side">
						<div className="textandimage">
							<div className="text">
								<span className="text-sub">welcome to </span> 
								<span className="text-main">NTsocial</span>
							</div>
							<div className="image">
								<img src={loginImg} alt="image"/>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}
}