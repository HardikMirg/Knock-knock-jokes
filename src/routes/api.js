const express = require("express");
const router = express.Router();
require('dotenv').config()

router.get("/", (req, res) => {
  const { google } = require("googleapis");
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const getdata = async () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const metaData = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "jokes",
    });

    let data = metaData.data.values;

    let jokify = (name, end) => {
        let joke = {
            0: "Knock, Knock!",
            1: "Who's There?",
            2: name,
            3: `${name} who?`,
            4: end
        }
        return joke;
    }

    let jokes = [];
    data.forEach((item, index) => {
    
        let joke = jokify(data[index][2], data[index][4])
        jokes.push(joke)
    })


    res.json(jokes)
  };

  getdata() 
});

module.exports = router;
