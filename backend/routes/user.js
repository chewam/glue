'use strict';

const config = require('../config');
var mongoose = require('mongoose');

module.exports = {
    method: 'GET',
    path: '/user/{_id}',
    config: {auth: 'jwt'},
    handler: (request, reply) => {
        var db = mongoose.createConnection(config.mongodb);
        var User = db.model('user');

        User.findById(request.params._id, (err, user) => {
            if (err) {
                throw err;
            } else {
                reply(user);

                var Event = db.model('event');
                var event = new Event({
                    emitter: request.session._id,
                    receiver: user._id,
                    type: 'visit'
                });
                event.save();
            }
        });
    }
};
