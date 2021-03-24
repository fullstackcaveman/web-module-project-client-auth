import { useState } from 'react';

import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialNewFriend = {
	name: '',
	email: '',
	age: '',
};

const AddFriend = () => {
	const [formValues, setFormValues] = useState(initialNewFriend);

	const inputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
	};

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		const valueToUse = type === 'checkbox' ? checked : value;
		inputChange(name, valueToUse);
	};

	const addFriend = (e) => {
		e.preventDefault();

		axiosWithAuth()
			.post('/api/friends', formValues)
			.then((res) => {
				setFormValues(initialNewFriend);
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
					<h2>Add Friend</h2>
				</Grid>

				<form onSubmit={addFriend}>
					<TextField
						style={inputStyle}
						label='Name'
						placeholder='Name'
						variant='outlined'
						size='small'
						fullWidth
						name='name'
						value={formValues.name}
						onChange={onChange}
					/>

					<TextField
						style={inputStyle}
						label='Email'
						placeholder='Email'
						variant='outlined'
						size='small'
						fullWidth
						name='email'
						value={formValues.password}
						type='email'
						onChange={onChange}
					/>

					<TextField
						style={inputStyle}
						label='Age'
						placeholder='Age'
						variant='outlined'
						size='small'
						fullWidth
						name='age'
						value={formValues.password}
						type='text'
						onChange={onChange}
					/>

					<Button
						style={submitBtnStyle}
						type='submit'
						color='primary'
						variant='contained'
						fullWidth
					>
						Submit
					</Button>

					<Link to='/friendslist'>CANCEL</Link>
				</form>
			</Paper>
		</Grid>
	);
};

export default AddFriend;
