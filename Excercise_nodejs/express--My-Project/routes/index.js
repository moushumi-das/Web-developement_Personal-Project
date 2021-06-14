const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//database url
const mongoDB = 'mongodb://localhost:27017/class_practice';
// database connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
const Schema = mongoose.Schema;

//schema means what properties our schema will have
const SuperHeroSchema = new Schema({
    name: String,
    movies: Number
});

const superheroModel = mongoose.model('superheroCollection', SuperHeroSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    const myData = new superheroModel({ name: 'Hulk', movies: 3 });
    myData.save(function(err) {
        if (err)
            console.log('err')
    });
    superheroModel.find({ 'name': 'Hulk' }, 'name movies', function(err, result) {
        console.log(result);
    })
    res.render('index', { title: 'Express' });
});

module.exports = router;