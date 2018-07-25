import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';

const Main = () => {
  return (
    <Router>
			<div id="main">
				<Switch>
					<Route exact path="/" component={AllProducts} />
					<Route exact path="/products" component={AllProducts} />
					<Route exact path="/products/:id" component={SingleProduct} />
				</Switch>
			</div>
    </Router>
  )
}

export default Main