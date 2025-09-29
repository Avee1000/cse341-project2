const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.classification = require('./classification.js')(mongoose);
db.cars = require('./cars.js')(mongoose);

module.exports = db;
