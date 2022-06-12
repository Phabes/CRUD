import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './CampaignForm.css'

class CampaignForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            keywords: "start keywords",
            bid: 1000,
            fund: 0,
            status: true,
            town: "Cracov",
            radius: 10,
            msg: "",
            color: "#ad0000",
            emeralds: 0
        }
    }

    componentDidMount = () => {
        this.reloadEmeralds()
    }

    reloadEmeralds = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        // fetch('http://192.168.55.111:5555/getEmeralds', requestOptions)
        fetch('https://campaigns-crud.herokuapp.com/getEmeralds', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ emeralds: data.emeralds }, () => this.deduceCampaignFund())
            });
    }

    deduceCampaignFund = () => {
        let { emeralds } = this.state
        emeralds = Math.round(emeralds / 20 * 100) / 100
        this.setState({
            fund: emeralds
        })
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
            fund: Math.round(e.target.value * 100) / 100
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
        delete campaign.msg
        delete campaign.color
        delete campaign.emeralds
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ campaign: campaign, index: index })
        };
        // fetch('http://192.168.55.111:5555/addCampaign', requestOptions)
        fetch('https://campaigns-crud.herokuapp.com/addCampaign', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.action)
                this.reloadEmeralds()
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
        let err = "Campaign successfully added"
        let color = "#ad0000"
        if (this.state.name === "")
            err = "Campign Name Required"
        else if (this.state.keywords === "")
            err = "Keywords Required"
        else if (this.state.bid < 1000)
            err = "Bid At Least 1000"
        else if (this.state.fund < 0)
            err = "Campaigns Fund Required"
        else if (this.state.emeralds - this.state.fund < 0)
            err = "Campaigns Fund Must Stay Positive"
        else if (this.state.town === null)
            err = "Town Required"
        else if (this.state.radius < 0)
            err = "Radius Required"
        if (err === "Campaign successfully added") {
            color = "#2cdf1c"
            this.save()
        }
        this.setState({
            msg: err,
            color: color
        })
    }

    render() {
        let emeraldsLeft = this.state.emeralds - this.state.fund
        return (
            <div id='content'>
                <div id='centered'>
                    <div id='title'>
                        <div className='titleElement'>Creator</div>
                        <Link className='linkButton titleElement' to={`${this.redirectToCampaigns()}`}>Product Campaigns</Link>
                    </div>
                    <div id="newCampaignForm">
                        <div className='formRow'>
                            <div className='rowName'>Name</div>
                            <input type="text" value={this.state.name} onChange={this.updateCampaignName} required={true} />
                        </div>
                        <div className='formRow'>
                            <div className='rowName'>Keywords</div>
                            <input type="text" value={this.state.keywords} onChange={this.updateKeywords} required={true} />
                        </div>
                        <div className='formRow'>
                            <div className='rowName'>Bid</div>
                            <input type="number" value={this.state.bid} onChange={this.updateBid} min={1000} required={true} />
                        </div>
                        <div className='formRow'>
                            <div className='rowName'><div>Fund</div><div>[{emeraldsLeft} $]</div></div>
                            <input type="number" value={this.state.fund} onChange={this.updateCampaignFund} required={true} />
                        </div>
                        <div className='formRow'>
                            <div className='rowName'>Status</div>
                            <input type="checkbox" checked={this.state.status} min={1000} onChange={this.updateStatus} />
                        </div>
                        <div className='formRow'>
                            <div className='rowName'>Town</div>
                            <select value={this.state.town} onChange={this.updateTown}>
                                {["Cracov", "Warsaw", "Paris"].map((town) => {
                                    return <option key={`option_${town}`} value={town}>{town}</option>
                                })}
                            </select>
                        </div>
                        <div className='formRow'>
                            <div className='rowName'>Radius [km]</div>
                            <input type="number" value={this.state.radius} onChange={this.updateRadius} required={true} />
                        </div>
                        <div className='formRow'>
                            <div className='submitButton' onClick={this.handleForm}>Save Campaign</div>
                        </div>
                        <div className='formRow'>
                            <div style={{ color: this.state.color }} id="msg">{this.state.msg}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignForm;