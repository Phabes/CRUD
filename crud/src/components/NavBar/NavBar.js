import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class NavBar extends Component {
    render() {
        return (
            <nav>
                <Link to="/">Products</Link>
            </nav>
        );
    }
}

NavBar.propTypes = {

};

export default NavBar;