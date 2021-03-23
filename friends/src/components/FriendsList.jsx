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
	}, [friends]);

	const deleteFriend = (id) => {
		axiosWithAuth()
			.delete(`/api/friends/${id}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<div className='friendslist'>
			<h1>Friends</h1>
			<div className='friend'>
				{friends.map((friend) => {
					return (
						<Friend key={friend.id} {...friend} deleteFriend={deleteFriend} />
					);
				})}
			</div>
		</div>
	);
};

export default FriendsList;
