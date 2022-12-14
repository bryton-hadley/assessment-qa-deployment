const express = require('express')
//setting up cors
const cors = require('cors')

const path = require('path')

//setting up dotenv
require('dotenv').config()

const app = express()

const {bots, playerRecord} = require('./data')

const {shuffleArray} = require('./utils')

app.use(express.json())
app.use(cors()) 

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '4ddcb490ff7944bcb46e7f1d4c476145',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

//setiing up the middlewear endpoints to send all files 
app.get('/', (req,res) => {
    rollbar.log('It worked')
    res.sendFile(path.join(__dirname, '/public/index.html'))

})
//setting up end point for the css page
app.get('/styles', (req,res) => {

    res.sendFile(path.join(__dirname, '/public/index.css'))
})
//setting up end point for js
app.get('/js', (req, res) => {

    res.sendFile(path.join(__dirname, '/public/index.js'))
})

app.get('/api/robots', (req, res) => {
    try {
        res.send(200).status(botsArr)
    } catch (error) {
        //adding a roll bar log to log the error of the bots not working 
        rollbar.log('Bots did not load!')
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        //setting up rollbar 
        rollbar.log("Couldn't select five bots ")
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            //setting up a rollbar long to log and see if you won is working 
            rollbar.log('YOU WON is working!')
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        //setting uo a rollbar log to loga th error
        rollbar.log('ERROR CAN"T GET PLAYER STATUS')
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})