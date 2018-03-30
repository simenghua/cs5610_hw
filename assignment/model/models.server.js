var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/webdev', {useMongoClient: true}); //for local
var db = mongoose.connect('mongodb://shua:shua@ds263847.mlab.com:63847/heroku_7rf1hhrg', {useMongoClient: true}); //for heroku

module.exports = db;
