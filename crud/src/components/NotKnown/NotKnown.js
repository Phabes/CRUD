import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NotKnown.css'

class NotKnown extends Component {
    render() {
        return (
            <div id='notKnown'>
                You shouldn't be here :)
            </div>
        );
    }
}

NotKnown.propTypes = {

};

export default NotKnown;