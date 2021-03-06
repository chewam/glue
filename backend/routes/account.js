'use strict';

const config = require('../config');
var mongoose = require('mongoose');

module.exports = {
    method: 'GET',
    path: '/account',
    config: {auth: 'jwt'},
    handler: (request, reply) => {
        var db = mongoose.createConnection(config.mongodb);
        var User = db.model('user');

        User.findById(request.session._id, (err, user) => {
            if (err) {
                throw err;
            } else {
                reply({
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                });
            }
        });
    }
};
