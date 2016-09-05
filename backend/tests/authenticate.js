'use strict';

var test = require('tape');
var server = require('../server.js');

module.exports = function(user) {

    test('Authenticate without credentials', (t) => {
        t.plan(1);

        var options = {
            method: 'POST',
            url: '/authenticate',
            payload: {
                email: '',
                password: ''
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Authenticate with wrong password', (t) => {
        t.plan(1);

        var options = {
            method: 'POST',
            url: '/authenticate',
            payload: {
                email: user.email,
                password: user.password + '_wrong'
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 403, '403: ' + response.result.message);
            t.end();
        });

    });

    test('Authenticate with credentials', (t) => {
        t.plan(1);

        var options = {
            method: 'POST',
            url: '/authenticate',
            payload: {
                email: user.email,
                password: user.password
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 200, '200: ' + response.result.token);
            user.token = response.result.token;
            require('./account')(user);
            t.end();
        });

    });

};
