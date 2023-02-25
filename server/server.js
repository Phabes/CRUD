const express = require('express')
const cors = require("cors");
const app = express()
const PORT = 5555

app.use(cors())
// app.use(cors({
//     credentials: true,
//     origin: "http://192.168.55.111:3000"
// }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let fund = 236725
let products = [
    {
        name: "headphones",
        campaigns: []
    },
    {
        name: "microphone",
        campaigns: [
            {
                "name": "Camp1",
                "keywords": "camp 1",
                "bid": 1000,
                "fund": 12306,
                "status": true,
                "town": "Paris",
                "radius": 10
            },
            {
                "name": "Camp2",
                "keywords": "2 camp",
                "bid": 1000,
                "fund": 1000,
                "status": false,
                "town": "Warsaw",
                "radius": 13
            }
        ]
    },
    {
        name: "keyboard",
        campaigns: []
    },
    {
        name: "laptop",
        campaigns: []
    }
]

function calculateEmeralds() {
    let total = fund
    products.forEach(product => {
        product.campaigns.forEach(campaign => {
            total -= campaign.fund
        });
    });
    return Math.round(total * 100) / 100
}

app.post('/getProducts', (req, res) => {
    let productNames = []
    products.forEach((product, index) => {
        productNames.push({
            name: product.name,
            index: index
        })
    });
    res.status(200).json(productNames)
})

app.post('/addCampaign', (req, res) => {
    const { index, campaign } = req.body
    products[index].campaigns.push(campaign)
    res.status(200).json({ action: "added" })
})

app.post('/editCampaign', (req, res) => {
    const { productIndex, index, campaign } = req.body
    products[productIndex].campaigns[index] = campaign
    res.status(200).json({ action: "updated" })
})

app.post('/getCampaigns', (req, res) => {
    const { index } = req.body
    res.status(200).json({ action: "found", campaigns: products[index].campaigns })
})

app.post('/getCampaign', (req, res) => {
    const { productIndex, index } = req.body
    res.status(200).json({ action: "found", campaign: products[productIndex].campaigns[index], emeralds: calculateEmeralds() })
})

app.post('/getEmeralds', (req, res) => {
    res.status(200).json({ emeralds: calculateEmeralds() })
})

app.delete('/deleteCampaign', (req, res) => {
    const { productIndex, index } = req.body
    products[productIndex].campaigns.splice(index, 1)
    res.status(200).json({ action: "deleted" })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})