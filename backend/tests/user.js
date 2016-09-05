'use strict';

var test = require('tape');
var server = require('../server.js');

function getIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = function(user, users) {

    var index = getIndex(0, users.length - 1);

    test('Visit user: ' + users[index]._id, (t) => {
        t.plan(2);

        var options = {
            method: 'GET',
            url: '/user/' + users[index]._id,
            headers: {
                Authorization: user.token
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 200, '200: OK');
            t.equal(response.result.name, users[index].name, 'User found: ' + response.result.name);
            server.stop(t.end);
        });

    });

    test('Send message to user: ' + users[index]._id, (t) => {
        t.plan(2);

        var options = {
            method: 'POST',
            url: '/user/' + users[index]._id + '/message',
            headers: {
                Authorization: user.token
            },
            payload: {
                text: 'This is a test message'
            }
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 200, '200: OK');
            t.equal(response.result.success, true, 'Message successfully sent');
            server.stop(t.end);
        });

    });

};
