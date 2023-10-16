// server.js
//console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://nguyenchisu10a4:0931246294%40Ge@gcs210796.buvywrw.mongodb.net/'

// (0) CONNECT: server -> connect -> MongoDB Atlas 
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

        const db = client.db('ATN_shop')
        const quotesCollection = db.collection('quotes')
        
        app.set('view engine', 'ejs') 
        
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(express.static('public'))

        app.use(bodyParser.json())
        //Read
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {

                    console.log(results)
                    
                    res.render('index.ejs', { quotes: results })
                })
                .catch(/* ... */)
        })
        // Create
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                
                console.log(result)

                res.redirect('/')
             })
            .catch(error => console.error(error))
        })
        
        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })


