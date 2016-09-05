'use strict';

const config = require('../config');
var mongoose = require('mongoose');

module.exports = {
    method: 'GET',
    path: '/search',
    config: {auth: 'jwt'},
    handler: (request, reply) => {
        var db = mongoose.createConnection(config.mongodb);
        var User = db.model('user');

        User.find({}, (err, users) => {
            if (err) {
                throw err;
            } else {
                reply(users);
            }
        });
    }
};
