'use strict';

var Joi = require('joi');
const Boom = require('boom');
const config = require('../config');
var mongoose = require('mongoose');

// TODO: Not the right place to set those dates
var today = new Date();
var minDate = new Date();
var maxDate = new Date();
minDate.setDate(today.getDate() - 365.25*78);
maxDate.setDate(today.getDate() - 365.25*18);

const payload = Joi.object({
    birthDate: Joi.date().min(minDate).max(maxDate).required().error(new Error('Birth date is required')),
    name: Joi.string().min(3).max(25).required().error(new Error('Name is required')),
    gender: Joi.string().valid('male', 'female').required().error(new Error('Gender is required')),
    email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().error(new Error('Email is required')),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/).required().error(new Error('Password is required'))
});

module.exports = {
    method: 'POST',
    path: '/register',
    config: {
        auth: false,
        validate: {
            payload: payload
        }
    },
    handler: (request, reply) => {
        var db = mongoose.createConnection(config.mongodb);
        var User = db.model('user');

        var user = new User(request.payload);

        user.save((err) => {
            if (err) {
                if (err.name === 'ValidationError') {
                    return reply(Boom.badRequest(err.message));
                } else if (err.code === 11000) {
                    return reply(Boom.conflict('Duplicated entries'));
                } else {
                    throw err;
                }
            } else {
                return reply({success: true});
            }
        });
    }
};
