import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductLink from '../ProductLink/ProductLink';
import './ProductList.css'

class ProductList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let products = []
        this.props.products.forEach((product, index) => {
            products.push(<ProductLink key={`product${index}`} product={product} />)
        });
        return (
            <div id='productList' >
                {products}
            </div>
        );
    }
}

ProductList.propTypes = {
};

export default ProductList;