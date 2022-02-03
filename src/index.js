const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("welcome to knock knock jokes")
});

const api = require('./routes/api')

app.use('/api', api)

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
});