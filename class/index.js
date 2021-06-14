const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();
const port = process.env.PORT;
const dburl = "mongodb://localhost:27017"
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const superheroes = [
    { id: 1, name: 'SPIDER-MAN' },
    { id: 2, name: 'CAPTAIN MARVEL' },
    { id: 3, name: 'HULK' },
    { id: 4, name: 'THOR' },
    { id: 5, name: 'IRON MAN' },
    { id: 6, name: 'DAREDEVIL' },
    { id: 7, name: 'BLACK WIDOW' },
    { id: 8, name: 'CAPTAIN AMERICA' },
    { id: 9, name: 'WOLVERINE' }
];
app.set('view engine', 'pug');
app.use(express.static('public'));
app.get('/', function(req, res) {
    mongoClient.connect(dburl, function(err, client) {
        const myDataBase = client.db('comics');
        const myCollection = myDataBase.collection('superheroes');
        myCollection.find({}).toArray((err, documents) => {
            console.log(documents);
            client.close();
            res.render('index', { documents });
        });
    });
});
app.get('/superheroes/:id', function(req, res) {
    const selectedId = req.params.id;
    mongoClient.connect(dburl, function(err, client) {
        const myDataBase = client.db('comics');
        const myCollection = myDataBase.collection('superheroes');
        const filter = { _id: ObjectID(selectedId) };
        myCollection.find(filter).toArray((err, documents) => {
            var selectedSuperHero = documents[0];
            var selectedColor = documents[3];
            client.close();
            res.render('superhero', { superhero: selectedSuperHero });
        });
    });
});
app.get('/edit/:id', function(req, res) {
    const selectedId = req.params.id;
    mongoClient.connect(dburl, function(err, client) {
        const myDataBase = client.db('comics');
        const myCollection = myDataBase.collection('superheroes');
        const filter = { _id: ObjectID(selectedId) };
        myCollection.find(filter).toArray((err, documents) => {
            var selectedSuperHero = documents[0];
            var selectedColor = documents[3];
            client.close();
            res.render('edit', { superhero: selectedSuperHero });
        });
    });
});
app.get('/delete/:id', function(req, res) {
    const selectedId = req.params.id;
    mongoClient.connect(dburl, function(err, client) {
        const myDataBase = client.db('comics');
        const myCollection = myDataBase.collection('superheroes');
        const filter = { _id: ObjectID(selectedId) };
        myCollection.deleteOne(filter, function(err, result) {
            client.close();
            res.redirect('/');
        });
    });
});
app.post('/superheroes', urlEncodedParser, function(req, res) {
    const newSuperHero = {
        name: req.body.superhero,
        description: req.body.description,
        weather: req.body.weather,
        color: req.body.color

    }
    mongoClient.connect(dburl, function(err, client) {
        const myDataBase = client.db('comics');
        const myCollection = myDataBase.collection('superheroes');
        myCollection.insertOne(newSuperHero, (err, result) => {
            client.close();
            res.redirect('/');
        });
    });
});
app.post('/edit', urlEncodedParser, function(req, res) {
    const selectedId = req.body._id;
    const filter = { _id: ObjectID(selectedId) };
    const set = { $set: { name: req.body.superhero, description: req.body.description, weather: req.body.weather, color: req.body.color } };
    mongoClient.connect(dburl, function(err, client) {
        const myDataBase = client.db('comics');
        const myCollection = myDataBase.collection('superheroes');
        myCollection.updateOne(filter, set, (err, result) => {
            client.close();
            res.redirect('/edit/' + selectedId);
        });
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});