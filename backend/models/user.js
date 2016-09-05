'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    // author: Schema.ObjectId,
    name: {
        type: String,
        unique: true,
        required: [true, 'User name is missing'],
        dropDups: true,
        min: [3, 'Too few letters'],
        max: [25, 'Too many letters']
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        dropDups: true,
        lowercase: true,
        required: [true, 'User email is missing'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Email is not valid'
        ]
    },
    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
            'Password must be at least 8 characters, including: 1 uppercase alphabet, 1 lowercase alphabet, 1 number and 1 special character'
        ],
        set: (val) => {
            if (val && val.length) {
                var salt = bcrypt.genSaltSync(10);
                val = bcrypt.hashSync(val, salt);
            }
            return val;
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'User gender is missing']
    },
    birthDate: {
        type: Date,
        // min: [18, 'Too young'],
        // max: [78, 'Too old'],
        required: [true, 'User birth date is missing']
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastConnectionDate: {
        type: Date
    }
});

// User.pre('validate', (next) => {
//     console.log('PRE VALIDATE');
//     next();
// });
//
// User.post('validate', () => {
//     console.log('POST VALIDATE');
//     // next();
// });
//
// User.pre('save', (next) => {
//     console.log('PRE SAVE', this);
//     next();
// });
