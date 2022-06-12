import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <nav>
                <Link className='navLink' to="/">Products</Link>
            </nav>
        );
    }
}

NavBar.propTypes = {

};

export default NavBar;