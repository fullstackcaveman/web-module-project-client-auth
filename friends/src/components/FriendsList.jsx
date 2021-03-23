import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Friend from './Friend';

const initialFriends = [
	{
		name: '',
		email: '',
		age: '',
	},
];

const FriendsList = () => {
	const [friends, setFriends] = useState(initialFriends);

	useEffect(() => {
		const getFriends = () => {
			axiosWithAuth()
				.get('/api/friends')
				.then((res) => {
					setFriends(res.data);
				})
				.catch((err) => {
					console.log(err.response);
				});
		};
		getFriends();
	}, []);

	return (
		<div className='friendslist'>
			<h1>Friends</h1>
			<div className='friend'>
				{friends.map((friend) => {
					return <Friend key={friend.name} {...friend} />;
				})}
			</div>
		</div>
	);
};

export default FriendsList;
