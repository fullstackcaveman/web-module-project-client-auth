import React from 'react';
import axios from 'axios';

import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

const Login = (props) => {
	const { values, change, disabled } = props;

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		const valueToUse = type === 'checkbox' ? checked : value;
		change(name, valueToUse);
	};

	const login = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:5000/api/login', values)
			.then((res) => {
				localStorage.setItem('token', res.data.payload);
				window.location.href = '/friendslist';
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const paperStyle = {
		padding: 20,
		height: 'auto',
		width: 250,
		margin: '20px auto',
	};

	const avatarStyle = { backgroundColor: '#3F51B5' };

	const inputStyle = {
		margin: '5px auto',
	};

	const submitBtnStyle = {
		marginTop: '10px',
		backgroundColor: '#3F51B5',
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align='center'>
					<Avatar style={avatarStyle}>
						<PersonIcon />
					</Avatar>
					<h2>Login</h2>
				</Grid>

				<form onSubmit={login}>
					<TextField
						style={inputStyle}
						label='Username'
						placeholder='Username'
						variant='outlined'
						size='small'
						fullWidth
						name='username'
						value={values.username}
						onChange={onChange}
					/>

					<TextField
						style={inputStyle}
						label='Password'
						placeholder='Password'
						variant='outlined'
						size='small'
						fullWidth
						name='password'
						value={values.password}
						type='password'
						onChange={onChange}
					/>

					<Button
						style={submitBtnStyle}
						type='submit'
						color='primary'
						variant='contained'
						fullWidth
						disabled={disabled}
					>
						Submit
					</Button>

					<Link to='/'>CANCEL</Link>
				</form>
			</Paper>
		</Grid>
	);
};

export default Login;
