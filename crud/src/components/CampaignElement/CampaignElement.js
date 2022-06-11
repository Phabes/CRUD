import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './CampaignElement.css'

class CampaignElement extends Component {
    constructor(props) {
        super(props)
    }

    deleteCampaign = () => {
        const params = window.location.pathname.split("/")
        const productIndex = params[params.length - 1]
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productIndex: productIndex, index: this.props.index })
        };
        fetch('http://192.168.55.111:5555/deleteCampaign', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.action == "deleted")
                    this.props.refreshCampaigns()
            });
    }

    render() {
        return (
            <div className='singleCampaign'>
                <div className='campaignField'>{this.props.campaign.name}</div>
                <div className='campaignField'>{this.props.campaign.keywords}</div>
                <div className='campaignField'>{this.props.campaign.bid}</div>
                <div className='campaignField'>{this.props.campaign.fund}</div>
                <div className='campaignField'>{this.props.campaign.status.toString()}</div>
                <div className='campaignField'>{this.props.campaign.town}</div>
                <div className='campaignField'>{this.props.campaign.radius}</div>
                <div className='campaignField'><button onClick={this.deleteCampaign}>DELETE</button></div>
                <div className='campaignField'><Link to={window.location.pathname + "/" + this.props.index + "/update"}>EDIT</Link></div>
            </div>
        );
    }
}

CampaignElement.propTypes = {

};

export default CampaignElement;