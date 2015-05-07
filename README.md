# node-slack-incoming-webhook

Send messages to slack with [incoming webhooks](https://api.slack.com/incoming-webhooks).

## Install

Install the [package](https://npmjs.com/package/slack-incoming-webhook) with [npm](https://npmjs.com):

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

### `slack(message[, opts[, cb]])`

Sends a message to the configured Webhook URL. You can override options with `opts`,
the optional callback is called when the request is completed.

## License

MIT
