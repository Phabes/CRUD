const express = require('express')
const app = express()
const port = 5555

let products = [
    "headphones",
    "microphone",
    "keyboard",
    "laptot"
]

app.post('/', (req, res) => {
    console.log("POST REQUEST")
    res.status(200).json({ products: products })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})