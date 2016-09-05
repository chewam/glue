'use strict';

var Joi = require('joi');
const config = require('../config');
var mongoose = require('mongoose');

const payload = Joi.object({
    text: Joi.string().min(1).max(240).required().error(new Error('Text is required'))
});

module.exports = {
    method: 'POST',
    path: '/user/{_id}/message',
    config: {
        auth: 'jwt',
        validate: {
            payload: payload
        }
    },
    handler: (request, reply) => {
        var db = mongoose.createConnection(config.mongodb);
        var User = db.model('user');

        User.findById(request.params._id, (err, user) => {
            if (err) {
                throw err;
            } else {
                var Message = db.model('message');
                var message = new Message({
                    emitter: request.session._id,
                    receiver: user._id,
                    text: request.payload.text
                });
                message.save((err) => {
                    if (err) {
                        throw err;
                    } else {
                        reply({success: true});
                        var Event = db.model('event');
                        var event = new Event({
                            emitter: request.session._id,
                            receiver: user._id,
                            type: 'message'
                        });
                        event.save();
                    }
                });
            }
        });
    }
};
