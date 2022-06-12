import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './ProductLink.css'

class ProductLink extends Component {
    constructor(props) {
        super(props)
    }

    capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <Link className='singleProduct'
                to={`/products/${this.props.product.index}`}
            >{this.capitalFirstLetter(this.props.product.name)}</Link>
        );
    }
}

ProductLink.propTypes = {
    name: PropTypes.string
};

export default ProductLink;