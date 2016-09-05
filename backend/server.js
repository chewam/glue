'use strict';

require('./models/');

const fs = require('fs');
const Good = require('good');
const Hapi = require('hapi');
const JWT = require('hapi-auth-jwt2');

var config = require('./config');

const server = new Hapi.Server();

const tls = {
    key: fs.readFileSync('../cert/server.key'),
    cert: fs.readFileSync('../cert/server.crt')
};

server.connection({port: config.port, tls: tls});

server.register([
    require('vision'),
    require('inert'),
    {register: require('lout')}
], function(err) {
    if (err) throw err;
});

server.register(JWT, function (err) {

    if (err) throw err;

    var options = {
        key: config.secretKey,
        verifyOptions: {algorithms: ['HS256']},
        validateFunc: function (decoded, request, callback) {
            request.session = decoded;
            return callback(null, decoded._id && decoded._id.length);
        }
    };

    server.auth.strategy('jwt', 'jwt', options);
    server.auth.default('jwt');

    server.route(require('./routes/authenticate'));
    server.route(require('./routes/register'));
    server.route(require('./routes/account'));
    server.route(require('./routes/message'));
    server.route(require('./routes/search'));
    server.route(require('./routes/user'));

});

// server.register({
//     register: Good,
//     options: {
//         reporters: {
//             console: [{
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{
//                     response: '*',
//                     log: '*'
//                 }]
//             }, {
//                 module: 'good-console'
//             }, 'stdout']
//         }
//     }
// }, (err) => {
//     if (err) throw err;
//
//     server.start((err) => {
//         if (err) {
//             throw err;
//         }
//         server.log('info', 'Server running at: ' + server.info.uri);
//     });
// });

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
