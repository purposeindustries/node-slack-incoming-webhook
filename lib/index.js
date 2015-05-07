'use strict';

var SlackClient = require('./client');

function wrap(client) {
  return function send(message, opts, cb) {
    if (typeof message === 'object') {
      return wrap(client.defaults(message));
    }
    client.send(message, opts, cb);
    return send;
  };
}

module.exports = function (message, opts, cb) {
  var client = new SlackClient();
  return wrap(client)(message, opts, cb);
};
