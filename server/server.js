const express = require('express')
const cors = require("cors");
const app = express()
const port = 5555

app.use(cors({
    credentials: true,
    origin: "http://192.168.55.111:3000"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [
    {
        name: "headphones",
        campaigns: []
    },
    {
        name: "microphone",
        campaigns: [
            {
                "name": "adasdasdasd",
                "keywords": "start keywords",
                "bid": 1000,
                "fund": "96",
                "status": true,
                "town": "Paris",
                "radius": 10
            },
            {
                "name": "qw",
                "keywords": "start keywords",
                "bid": 1000,
                "fund": "100",
                "status": false,
                "town": "Warsaw",
                "radius": "13"
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
    res.status(200).json({ action: "found", campaign: products[productIndex].campaigns[index] })
})

app.delete('/deleteCampaign', (req, res) => {
    const { productIndex, index } = req.body
    products[productIndex].campaigns.splice(index, 1)
    res.status(200).json({ action: "deleted" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})