'use strict';

var q = require('q');
var config = require('../config');
var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

var db = mongoose.createConnection(config.mongodb);

var User = require('./user');
mongoose.model('user', User);

var Event = require('./event');
mongoose.model('event', Event);

var Message = require('./message');
mongoose.model('message', Message);

db.close();
