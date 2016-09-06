import React, { Component, PropTypes } from 'react';
import { NAME, get } from './socket';

class Listener extends Component {

    componentWillMount () {

        const {socket, event, callback} = this.props;

        this.socket = get(socket);
        this.socket.on(event, callback);
    }

    componentWillUnmount () {

        const {event, callback} = this.props;

        this.socket.off(event, callback);
    }

    render () {

        return false;
    }
}

Listener.displayName = 'SocketListener';

Listener.propTypes = {
    socket  : PropTypes.string,
    event   : PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
};

Listener.defaultProps = {
    socket: NAME
};

export default Listener;