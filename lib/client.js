'use strict';

var extend = require('extend');
var http = require('http');
var https = require('https');
var parse = require('url').parse;

var SlackClient = module.exports = function SlackClient(opts) {
  this.opts = opts || {};
}

SlackClient.prototype.defaults = function defaults(opts) {
  return new SlackClient(extend(true, {}, this.opts, opts));
};

SlackClient.prototype.send = function send(message, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = this.opts;
  } else {
    opts = extend(true, {}, this.opts, opts);
  }
  cb = cb || function (err) {
    if (err) {
      throw err;
    }
  };

  var req = opts.request || opts.url.match(/^https/) ? https.request : http.request;
  var url = opts.url || process.env.SLACK_WEBHOOK_URL;

  var body = {
    text: message,
    username: opts.username,
    icon_url: opts.icon_url || (opts.icon && opts.icon.match(/^http/) && opts.icon),
    icon_emoji: opts.icon_emoji || (opts.icon && opts.icon.match(/^:/) && opts.icon),
    channel: opts.channel,
    attachments: opts.attachments,
    link_names: 1,
  };

  req(extend(parse(url), {
    method: 'post',
    headers: {
      'User-Agent': 'node-slack-incoming-webhook',
      'Content-Type': 'application/json',
    }
  }), function (res) {
    var response = '';
    res.on('data', function (chunk) {
      response += chunk;
    }).on('end', function () {
      if (res.statusCode >= 400) {
        return cb(new Error('Slack responded with ' + response + ' (' + res.statusCode + ')'));
      }
      return cb(null, response);
    }).on('error', cb);
  }).on('error', cb).end(JSON.stringify(body));
};
