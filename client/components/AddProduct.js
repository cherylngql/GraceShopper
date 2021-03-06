import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../store/user';
import axios from 'axios';

export class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      description: '',
      category: 'lighting',
      price: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.loadInitialData();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await axios.post('/api/products', this.state);
    alert('Success');
    this.props.history.push('/admin');
  }

  render() {
    return (
      this.props.user.admin ?
        <div className="right-panel">
          <div className="signin-login">
            <h1>Add A Product</h1>
            <br />
            <form className="form-main" onSubmit={this.handleSubmit}>
              <div className="form-main-field">
                <label htmlFor="image">Product Image URL</label>
                <input type="text" name="image" value={this.state.image} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="name">Product Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="description">Product Description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
              </div>
              <div className="form-main-field">
                <label htmlFor="category">Product Category</label>
                <select name="category" onChange={this.handleChange}>
                  <option value="lighting">Lighting</option>
                  <option value="greenery">Greenery</option>
                  <option value="textiles">Textiles</option>
                  <option value="wall-decor">Wall Decor</option>
                </select>
              </div>
              <div className="form-main-field">
                <label htmlFor="price">Product Price</label>
                <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
              </div>
              <div>
                <button type="submit" className="btn-main btn-right">submit</button>
              </div>
            </form>
          </div>
        </div> :
        <div className="user-container">
          <p>Sorry, you have no authorization to access this page.</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(getLoggedInUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
