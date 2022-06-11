import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import CampaignElement from '../CampaignElement/CampaignElement';

class CampaignsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campaigns: []
        }
    }

    componentDidMount = () => {
        this.getCampaigns()
    }

    getCampaigns = () => {
        const params = window.location.pathname.split("/")
        const index = params[params.length - 1]
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: index })
        };
        fetch('http://192.168.55.111:5555/getCampaigns', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.action == "found") {
                    this.setState({ campaigns: data.campaigns })
                }
            });
    }

    render() {
        let campaigns = []
        this.state.campaigns.forEach((campaign, index) => {
            campaigns.push(<CampaignElement key={`campaign_${index}`} campaign={campaign} index={index} refreshCampaigns={this.getCampaigns} />)
        });
        return (
            <div>
                CAMPAIGNS
                <Link to={`${window.location.pathname}/create`}>Create Campaign</Link>
                <div className='singleCampaign'>
                    <div className='campaignField'>Name</div>
                    <div className='campaignField'>Keywords</div>
                    <div className='campaignField'>Bid</div>
                    <div className='campaignField'>Fund</div>
                    <div className='campaignField'>Status</div>
                    <div className='campaignField'>Town</div>
                    <div className='campaignField'>Radius</div>
                    <div className='campaignField'>Remove</div>
                    <div className='campaignField'>Update</div>
                </div>
                {campaigns}
            </div>
        );
    }
}

CampaignsList.propTypes = {

};

export default CampaignsList;