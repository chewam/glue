'use strict';

var test = require('tape');
var server = require('../server.js');
var extend = require('util')._extend;

module.exports = function(user) {

    test('Register a user with no data', (t) => {
        t.plan(1);

        var options = {
            method: 'POST',
            url: '/register'
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with empty name', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.name = '';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with empty email', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.email = '';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with empty password', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.password = '';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with empty gender', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.gender = '';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with empty birth date', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.birthDate = '';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with invalid email', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.email = 'this_is_not_a_valid_email';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with invalid gender', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.gender = 'neutral';

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 400, '400: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with data', (t) => {
        t.plan(1);

        var payload = extend({}, user);

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 200, '200: ' + response.payload);
            t.end();
        });

    });

    test('Register a user with same name', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.email = '_' + user.email;

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 409, '409: ' + response.result.message);
            t.end();
        });

    });

    test('Register a user with same email', (t) => {
        t.plan(1);

        var payload = extend({}, user);
        payload.name = '_' + user.name;

        var options = {
            method: 'POST',
            url: '/register',
            payload: payload
        };

        server.inject(options, (response) => {
            t.equal(response.statusCode, 409, '409: ' + response.result.message);
            require('./authenticate')(user);
            t.end();
        });

    });

};
