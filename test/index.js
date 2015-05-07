'use strict';

var http = require('http');
var Client = require('../lib/client');
var slack = require('../lib');

var status = 200;
var response = 'ok';
var server = http.createServer(function (req, res) {
  res.writeHead(status);
  res.end(response);
});

describe('slack-incoming-webhook', function () {
  describe('SlackClient', function () {
    describe('ctor', function () {
      it('should set opts', function () {
        var c = new Client({
          foo: 'bar',
        });
        c.opts.foo.should.eql('bar');
      });
    });
    describe('defaults', function () {
      it('should return SlackClient', function () {
        var c = new Client().defaults({});
        c.should.be.an.instanceof(Client);
      });
      it('should override opts', function () {
        var c = new Client({
          foo: 'bar',
          baz: 'qux',
        });
        var cc = c.defaults({
          foo: 'woof',
          garply: 'xxx',
        });
        c.opts.should.have.properties({
          foo: 'bar',
          baz: 'qux',
        });
        cc.opts.should.have.properties({
          foo: 'woof',
          baz: 'qux',
          garply: 'xxx',
        });
      });
    });
  });
  describe('slack(opts)', function () {
    it('should return a function', function () {
      slack({}).should.be.an.instanceof(Function);
    });
    it('should be chainable', function () {
      slack({})({})({}).should.be.an.instanceof(Function);
    });
  });
  describe('slack(message)', function () {
    it('should work', function () {});
  })
})
