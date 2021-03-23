import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { axiosWithAuth } from './utils/axiosWithAuth';

import Navbar from './components/Navbar';
import Login from './components/Login';

import './App.css';
import FriendsList from './components/FriendsList';

const initialFormValues = {
	username: '',
	password: '',
};

function App() {
	const [formValues, setFormValues] = useState(initialFormValues);

	const inputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
	};

	const logout = () => {
		axiosWithAuth()
			.post('/api/logout')
			.then((res) => {
				localStorage.removeItem('token');
				window.location.href = '/login';
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<div className='App'>
			<Navbar logout={logout} />
			<Switch>
				<PrivateRoute exact path='/friendslist' component={FriendsList} />
				<Route exact path='/' />
				<Route path='/login'>
					<Login values={formValues} change={inputChange} />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
