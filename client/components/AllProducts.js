import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/products';
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart';

export class AllProducts extends Component {

  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    let products
    this.props.match.params.cat
    ?
    products = this.props.allProducts.filter(product => product.category === this.props.match.params.cat)
    :
    products = this.props.allProducts;
    return (
      <React.Fragment>
        {products.length
        ?
        <ul className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-preview">
              <Link to={`/products/${product.id}`} className="undecorated-link unpadded-link">
                <img src={product.image} />
              </Link>
              <div className="product-preview-details">
                <button type="button" className="btn-main" onClick={() => this.props.addToCart(product.id)}>+ Add</button>
                <Link to={`/products/${product.id}`} className="undecorated-link unpadded-link">
                  <p>{product.name}</p>
                  <p>{product.price} USD</p>
                </Link>
              </div>
            </div>
          ))}
        </ul>
        :
        <h1>No products available.</h1>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.products.allProducts
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addToCart: (productId) => dispatch(addToCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
