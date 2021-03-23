import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},

	menuButton: {
		marginRight: theme.spacing(2),
	},

	title: {
		display: 'block',
	},

	inputRoot: {
		color: 'inherit',
	},

	sectionDesktop: {
		display: 'flex',
	},
}));

export default function Navbar(props) {
	const { logout } = props;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(false);

	const isMenuOpen = anchorEl;

	const handleProfileMenuOpen = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogin = () => {
		window.location.href = '/login';
	};

	const handleClick = (route) => {
		if (route === 'home') {
			window.location.href = '/';
		} else if (route === 'friends') {
			window.location.href = '/friendslist';
		}
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem>
				<Link to='/' className='menulink'>
					Home
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to='/friendslist' className='menulink'>
					Friends List
				</Link>
			</MenuItem>
			<MenuItem onClick={() => logout()}>Logout</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position='static'>
				<Toolbar>
					<Typography className={classes.title} variant='h6' noWrap>
						Friends
					</Typography>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{localStorage.getItem('token') ? (
							<IconButton
								edge='end'
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								onClick={handleProfileMenuOpen}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
						) : (
							<Link to='/login' className='navlink'>
								Login
							</Link>
						)}
					</div>
				</Toolbar>
			</AppBar>
			{renderMenu}
		</div>
	);
}
