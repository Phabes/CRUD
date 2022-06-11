import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductList from './components/ProductList/ProductList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://192.168.55.111:5555/getProducts', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data })
      });
  }

  render() {
    return (
      <div>
        PRODUCTS
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;