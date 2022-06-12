import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import CampaignElement from '../CampaignElement/CampaignElement';
import './CampaignsList.css'

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
            <div id='content'>
                <div id='centered'>
                    <div id='title'><div className='titleElement'>Your Campaigns</div><Link className='linkButton titleElement' to={`${window.location.pathname}/create`}>Create Campaign</Link></div>
                    <div className='singleCampaign headers'>
                        <div className='campaignField specialField'>Name</div>
                        <div className='campaignField specialField hide'>Keywords</div>
                        <div className='campaignField hide'>Bid</div>
                        <div className='campaignField hide'>Fund</div>
                        <div className='campaignField hide'>Status</div>
                        <div className='campaignField hide'>Town</div>
                        <div className='campaignField specialField hide'>Radius [km]</div>
                        <div className='campaignField'>Remove</div>
                        <div className='campaignField'>Update</div>
                    </div>
                    {campaigns}
                </div>
            </div>
        );
    }
}

CampaignsList.propTypes = {

};

export default CampaignsList;