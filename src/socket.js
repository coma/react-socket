var React = require('react'),
    io    = require('socket.io-client');

var sockets = {};

module.exports = React.createClass({
    displayName         : 'Socket',
    propTypes           : {
        url    : React.PropTypes.string,
        name   : React.PropTypes.string,
        options: React.PropTypes.shape({
            reconnection        : React.PropTypes.bool,
            reconnectionAttempts: React.PropTypes.number,
            reconnectionDelay   : React.PropTypes.number,
            reconnectionDelayMax: React.PropTypes.number,
            randomizationFactor : React.PropTypes.number,
            timeout             : React.PropTypes.number
        })
    },
    getDefaultProps     : function () {

        return {
            name   : 'default',
            options: {}
        };
    },
    statics             : {
        socket: function (name) {

            name = name || 'default';

            if (!sockets.hasOwnProperty(name)) {

                throw new Error('There is no "' + name + '" socket mounted.');
            }

            return sockets[name];
        }
    },
    componentWillMount  : function () {

        if (sockets.hasOwnProperty(this.props.name)) {

            throw new Error('Another "' + this.props.name + '" socket is already mounted.');
        }

        sockets[this.props.name] = io(this.props.url, this.props.options);
    },
    componentWillUnmount: function () {

        sockets[this.props.name].disconnect();
        delete sockets[this.props.name];
    },
    render              : function () {

        return false;
    }
});
