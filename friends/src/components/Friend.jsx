import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		width: 250,
	},

	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const Friend = (props) => {
	const { name, email, age } = props;
	const classes = useStyles();

	return (
		<div className='friendcard'>
			<Card className={classes.root}>
				<CardContent>
					<Typography variant='h5' component='h2'>
						{name}
					</Typography>
					<Typography className={classes.pos} color='textSecondary'>
						{age}
					</Typography>
					<Typography variant='body2' component='p'>
						<a href={`mailto:${email}`}>{email}</a>
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Friend;
