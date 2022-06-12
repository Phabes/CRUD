import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductList from './components/ProductList/ProductList';
import './App.css'

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
    // fetch('http://192.168.55.111:5555/getProducts', 
    fetch('https://campaigns-crud.herokuapp.com/getProducts', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data })
      });
  }

  render() {
    return (
      <div id='content'>
        <div id='centered'>
          <div id='title'><div className='titleElement'>Your products</div></div>
          <ProductList products={this.state.products} />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;