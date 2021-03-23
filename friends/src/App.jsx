import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
	const [user, setUser] = useState();

	const inputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
	};

	const formSubmit = (newUser) => {
		setUser(newUser);
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
		<Router>
			<div className='App'>
				<Navbar logout={logout} />
				<Switch>
					<PrivateRoute exact path='/friendslist' component={FriendsList} />
					<Route exact path='/' />
					<Route path='/login'>
						<Login
							values={formValues}
							change={inputChange}
							submit={formSubmit}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
