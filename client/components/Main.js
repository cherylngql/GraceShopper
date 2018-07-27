import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';
import User from './User';
import SingleProduct from './SingleProduct';
import CartPage from './CartPage';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import {getLoggedInUser} from '../store/user';

class Main extends Component {
	componentDidMount() {
    this.props.loadInitialData()
	}

  render() {
		return (
			<Router>
				<div id="main">
					<div id="navbar">
						<NavBar />
					</div>
					<div className="container">
						<Switch>
							<Route exact path="/" component={AllProducts} />
							<Route exact path="/products" component={AllProducts} />
							<Route exact path="/products/:id" component={SingleProduct} />
							<Route exact path="/user/:id" component={User} />
							<Route exact path="/cart" component={CartPage} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
						</Switch>
					</div>
				</div>
			</Router>
		)
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getLoggedInUser())
    }
  }
}


export default connect(mapState, mapDispatch)(Main);
