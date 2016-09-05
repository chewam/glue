'use strict';

var test = require('tape');
var server = require('../server.js');

module.exports = function(user) {

    test('Get account without token', (t) => {
        t.plan(1);

        var options = {
            method: 'GET',
            url: '/account'
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 401, '401: ' + response.result.message);
            t.end();
        });

    });

    test('Get account with token', (t) => {
        t.plan(4);

        var options = {
            method: 'GET',
            url: '/account',
            headers: {
                Authorization: user.token
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 200, '200: ' + response.payload);
            t.equal(response.result.name, user.name, 'Check name');
            t.equal(response.result.gender, user.gender, 'Check gender');
            t.equal(response.result.email, user.email.toLowerCase(), 'Check email');
            server.stop(t.end);
        });

    });

};
