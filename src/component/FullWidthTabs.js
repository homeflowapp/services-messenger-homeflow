import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
});

class ScrollableTabsButtonForce extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 0,
		};
	}


	handleChange (event, value) {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div style={styles.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={() => this.handleChange(event, value)}
						scrollable
						scrollButtons="on"
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab icon={<a className={'image'}>
							<img src={'./assets/images/services/whatsapp.png'}/>
						</a>} />
						<Tab label="Item Three" icon={<PersonPinIcon />} />
						<Tab label="Item Four" icon={<HelpIcon />} />
						<Tab label="Item Five" icon={<ShoppingBasket />} />
						<Tab label="Item Six" icon={<ThumbDown />} />
						<Tab label="Item Seven" icon={<ThumbUp />} />
					</Tabs>
				</AppBar>
			</div>
		);
	}
}

ScrollableTabsButtonForce.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);