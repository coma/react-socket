react-socket
============

[![Build Status](https://travis-ci.org/coma/react-socket.png?branch=master)](https://travis-ci.org/coma/react-socket)
[![Dependency Status](https://david-dm.org/coma/react-socket.png)](http://david-dm.org/coma/react-socket)
[![NPM version](https://badge.fury.io/js/react-socket.png)](http://badge.fury.io/js/react-socket)

A React wrapper for Socket.IO

Usage
-----

Just mount a socket on one of your components:

```javascript
var React  = require('react'),
	Socket = require('react-socket').Socket;

module.exports = module.exports = React.createClass({
	render: function () {

		return (
			<div>
				<Socket url="your-socket-endpoint:port?"/>
			</div>
		);
	}
});
```

and then start listening to it:

```javascript
var React       = require('react'),
	SocketEvent = require('react-socket').Event;

module.exports = module.exports = React.createClass({
	onSocketMessage: function (message) {

		...
	},
	render: function () {

		return (
			<div>
				<SocketEvent name="your-socket-event" callback={ this.onSocketMessage }/>
			</div>
		);
	}
});
```

Use the name property to mount more than one socket:

```javascript
var React  = require('react'),
	Socket = require('react-socket');

module.exports = module.exports = React.createClass({
	render: function () {

		return (
			<div>
				<Socket.Socket url="/a" name="a"/>
				<Socket.Socket url="/b" name="b"/>
				<Socket.Event socket="a" name="foo" callback={ this.onA }/>
				<Socket.Event socket="b" name="foo" callback={ this.onB }/>
			</div>
		);
	}
});
```

Every mounted socket gets disconnect before its component gets unmounted and the same goes to the events. 