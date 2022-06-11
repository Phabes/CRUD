import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './CampaignForm.css'

class CampaignForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            keywords: "start keywords",
            bid: 1000,
            fund: this.deduceCampaignFund(),
            status: true,
            town: "Cracov",
            radius: 10,
            err: ""
        }
    }

    deduceCampaignFund = () => {
        return 100
    }

    updateCampaignName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    updateKeywords = (e) => {
        this.setState({
            keywords: e.target.value
        })
    }

    updateBid = (e) => {
        this.setState({
            bid: e.target.value
        })
    }

    updateCampaignFund = (e) => {
        this.setState({
            fund: e.target.value
        })
    }

    updateStatus = (e) => {
        this.setState({
            status: !this.state.status
        })
    }

    updateTown = (e) => {
        this.setState({
            town: e.target.value
        })
    }

    updateRadius = (e) => {
        this.setState({
            radius: e.target.value
        })
    }

    save = () => {
        const params = window.location.pathname.split("/")
        const index = params[params.length - 2]
        let campaign = { ...this.state }
        delete campaign.err
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ campaign: campaign, index: index })
        };
        fetch('http://192.168.55.111:5555/addCampaign', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.action)
            });
    }

    redirectToCampaigns = () => {
        const params = window.location.pathname.split("/")
        let path = ""
        for (let i = 1; i < params.length - 1; i++)
            path += ("/" + params[i])
        return path
    }

    handleForm = () => {
        let err = ""
        if (this.state.name == "")
            err = "Campign Name Required"
        else if (this.state.keywords == "")
            err = "Keywords Required"
        else if (this.state.bid == "")
            err = "Bid Required"
        else if (this.state.fund == "")
            err = "Campaigns Fund Required"
        else if (this.state.town == null)
            err = "Town Required"
        else if (this.state.radius == null)
            err = "Radius Required"
        if (err == "")
            this.save()
        this.setState({
            err: err
        })
    }

    render() {
        return (
            <div>
                <Link to={`${this.redirectToCampaigns()}`}>Campaigns</Link>
                <div id="newCampaignForm">
                    <div className='formRow'>
                        <input type="text" value={this.state.name} onChange={this.updateCampaignName} required={true} />
                    </div>
                    <div className='formRow'>
                        <input type="text" value={this.state.keywords} onChange={this.updateKeywords} required={true} />
                    </div>
                    <div className='formRow'>
                        <input type="number" value={this.state.bid} onChange={this.updateBid} min={1000} required={true} />
                    </div>
                    <div className='formRow'>
                        <input type="number" value={this.state.fund} onChange={this.updateCampaignFund} required={true} />
                    </div>
                    <div className='formRow'>
                        <input type="checkbox" checked={this.state.status} min={1000} onChange={this.updateStatus} />
                    </div>
                    <div className='formRow'>
                        <select value={this.state.town} onChange={this.updateTown}>
                            {["Cracov", "Warsaw", "Paris"].map((town) => {
                                return <option key={`option_${town}`} value={town}>{town}</option>
                            })}
                        </select>
                    </div>
                    <div className='formRow'>
                        <input type="number" value={this.state.radius} onChange={this.updateRadius} required={true} />
                    </div>
                    <div className='formRow'>
                        <button onClick={this.handleForm}>Save Campaign</button>
                    </div>
                    <div className='formRow'>
                        <div id="error">{this.state.err}</div>
                    </div>
                </div>
            </div>
        );
    }
}

CampaignForm.propTypes = {

};

export default CampaignForm;