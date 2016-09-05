'use strict';

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    emitter: {
        type: String,
        required: [true, 'Emitter is missing']
    },
    receiver: {
        type: String,
        required: [true, 'Receiver is missing']
    },
    text: {
        type: String,
        min: [1, 'Too few letters'],
        max: [240, 'Too many letters'],
        required: [true, 'Text is missing']
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});
