var React  = require('react'),
    Socket = require('./socket').socket;

module.exports = React.createClass({
    displayName         : 'SocketEvent',
    propTypes           : {
        socket  : React.PropTypes.string,
        name    : React.PropTypes.string,
        callback: React.PropTypes.func
    },
    getDefaultProps     : function () {

        return {
            socket: 'default'
        };
    },
    componentWillMount  : function () {

        Socket(this.props.socket)
            .on(this.props.name, this.props.callback);
    },
    componentWillUnmount: function () {

        Socket(this.props.socket)
            .off(this.props.name, this.props.callback);
    },
    render              : function () {

        return false;
    }
});
