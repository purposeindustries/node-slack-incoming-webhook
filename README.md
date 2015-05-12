# node-slack-incoming-webhook

Send messages to slack with [incoming webhooks][webhook-docs].

## Install

Install the [package][npm-package] with [npm][npm]:

```sh
$ npm install slack-incoming-webhook
```

## Usage

```js
var slack = require('slack-incoming-webhook');
var send = slack(opts);
// send = send(otherOpts)

send(message);
send(message, cb);
send(message, opts, cb);
```

## API

### `slack(opts)`

If invoked with a single `opts` object, it configures and returns a slack client.
It can be chained, like creating clients for posting to different channels:

```js
var client = slack({
  url: '{webhook url}',
});

var dev = client({
  channel: '#dev',
});

var ops = client({
  channel: '#ops',
});
```

### `slack(message[, opts[, cb]])`

Sends a message to the configured Webhook URL. You can override options with `opts`,
the optional callback is called when the request is completed.

## Options

Slack accepts the following options (besides the ones listed in the [webhook docs][webhook-docs], like `username`, `channel`, `icon_url`, `icon_emoji`, `attachments`):

- `url`: webhook url for slack, if not specified, it falls back to `process.env.SLACK_WEBHOOK_URL`
- `icon`: sets `icon_emoji` for values like `:moneybag:` and `icon_url` for values that look like an url

## License

MIT

[webhook-docs]: https://api.slack.com/incoming-webhooks
[npm-package]: https://npmjs.com/package/slack-incoming-webhook
[npm]: https://npmjs.org
