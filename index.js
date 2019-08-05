//import express from 'express';
const express = require('express');

//import hubs-model file
const Hubs = require('./data/hubs-model.js');
//hubs has find(), findById(), add(), remove(), update() methods

const server = express();

/// <<<<<<<<<<< add this line to teach express to parse JSON

server.use(express.json());

//no code for handling http GET requests to the / URL
server.get('/', (req, res)  => {
    res.send('Hello Web 20.75');
});

//see a list of Hubs (channels on Slack) /hubs
server.get('/hubs',(req, res) => {
    //hubs.find() returns a promise, we need the bros [.then().catch()]
    Hubs.find()
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(error => {
        res.status(500).json({message: 'error getting the list of hubs' })
    });
});


//create a hub
    server.post('/hubs', (req, res) => {

        const hubInformation = req.body;

        Hubs.add(hubInformation)
        .then(hub => {
            res.status(201).json(hub)
        })
        .catch(error => {
            res.status(500).json({ message: 'error adding in the hub'})
        })
    })

//delete a hub
    server.delete('/hubs/:id', (req, res) => {
        const hubId = req.params.id;

        Hubs.remove(hubId)
        .then(hub => {
            res.status(200).json({message: 'hubs deleted successfully'})
        })
        .catch(error => {
            res.status(500).json({ message: 'error adding in the hub'})
        })
    })

//update a hub (if time permits)

const port = 8000;
server.listen(port, () => console.log('\napi running\n'));