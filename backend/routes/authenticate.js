'use strict';

var Joi = require('joi');
const Boom = require('boom');
var bcrypt = require('bcrypt');
const config = require('../config');
var mongoose = require('mongoose');

const payload = Joi.object({
    email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().error(new Error('Email is required')),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/).required().error(new Error('Password is required'))
});

module.exports = {
    method: 'POST',
    path: '/authenticate',
    config: {
        auth: false,
        validate: {
            payload: payload
        }
    },
    handler: (request, reply) => {
        var db = mongoose.createConnection(config.mongodb);
        var User = db.model('user');

        User.findOne({email: request.payload.email.toLowerCase()}, (err, user) => {
            if (err) {
                throw err;
            } else if (user) {
                bcrypt.compare(request.payload.password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    } else if (isMatch) {
                        var token = require('jsonwebtoken').sign(
                            {_id: user._id},
                            config.secretKey
                        );
                        reply({token: token, name: user.name});
                        user.lastConnectionDate = Date.now();
                        user.save();
                    } else {
                        reply(Boom.forbidden('Wrong email or password'));
                    }
                });
            } else {
                reply(Boom.forbidden('Wrong email or password'));
            }
        });
    }
};
