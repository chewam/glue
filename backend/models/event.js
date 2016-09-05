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
    type: {
        type: String,
        enum: ['visit', 'message'],
        required: [true, 'Type is missing']
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});
