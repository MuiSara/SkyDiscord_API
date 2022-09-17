const express = require('express')
const uuidAPIKey = require('uuid-apikey')
const ciqlJson = require('ciql-json')
const bodyParser = require('body-parser')
const userSky = require('./Data/Sky.json')
const buyList = require('./Data/buyList.json')
const app = express();
const key = {
    apiKey: process.env.API_KEY,
    uuid: process.env.UUID'
};

const server = app.listen(3001, () => {
    console.log("Start Server : localhost:3001")
});

console.log(uuidAPIKey.create())

app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', async (req, res) => {
    res.sendStatus(403)
})

app.get('/api/server/ping/:apikey', async (req, res) => {
    let {
        apikey
    } = req.params;

    try {
        if (!uuidAPIKey.check(apikey, key.uuid)) {
            res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
        } else {
            res.send('<body style="background-color:black;"> <p style="color:white;">Pong!</p> </body>')

        }
    } catch {
        res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
    }

})

app.get('/api/sky/:userID/get/:apiKey/', async (req, res) => {
    let {
        userID,
        apiKey
    } = req.params;

    try {
        if (!uuidAPIKey.check(apiKey, key.uuid)) {
            res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
        } else {
            res.send(String(userSky[userID]))
        }
    } catch {
        res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
    }

})

app.get('/api/sky/:userID/add/:sky/:apiKey/', async (req, res) => {
    let {
        userID,
        sky,
        apiKey
    } = req.params;

    try {
        if (!uuidAPIKey.check(apiKey, key.uuid)) {
            res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
        } else {
            ciqlJson
                .open("Data/Sky.json")
                .set(userID, parseInt(userSky[userID]) + parseInt(sky))
                .save()
            res.send(String(userSky[userID]))
        }
    } catch {
        res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
    }

})

app.get('/api/sky/:userID/set/:sky/:apiKey/', async (req, res) => {
    let {
        userID,
        sky,
        apiKey
    } = req.params;

    try {
        if (!uuidAPIKey.check(apiKey, key.uuid)) {
            res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
        } else {
            ciqlJson
                .open("Data/Sky.json")
                .set(userID, parseInt(sky))
                .save()
            res.send(String(userSky[userID]))
        }
    } catch {
        res.send('<body style="background-color:black;"> <p style="color:white;">Check, Your API Key!</p> </body>')
    }

})
