'use strict';

var test = require('tape');
var server = require('../server.js');

module.exports = function(user) {

    test('Perform search', (t) => {
        t.plan(2);

        var options = {
            method: 'GET',
            url: '/search',
            headers: {
                Authorization: user.token
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 200, '200: OK');
            t.notEqual(response.result.length, 0, 'Users found: ' + response.result.length);
            require('./user')(user, response.result);
            t.end();
        });

    });

};
