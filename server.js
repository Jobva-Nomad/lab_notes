// server.js
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const uri = "mongodb+srv://Sasha:Sasha@cluster0.ezmlulv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'test';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Для отправки post-запросов и чтения get-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async function () {
    let client;
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
        
        const db = client.db(dbName);
        
        require('./routes')(app, db);
        
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    } catch (err) {
        console.log("Ошибка подключения к БД:", err.stack);
    }
})();
