import React, { Component, PropTypes } from 'react';

export const NAME = 'default';

const SOCKETS = {};

export const has = name => SOCKETS.hasOwnProperty(name);

export const get = (name = NAME) => {

    if (!has(name)) {

        throw new Error(`There is no "${ name }" socket mounted.`);
    }

    return SOCKETS[name];
};

class Socket extends Component {

    componentWillMount () {

        const {name, url, options} = this.props;

        if (has(name)) {

            throw new Error(`Another "${ name }" socket is already mounted.`);
        }

        SOCKETS[name] = io(url, options);
    }

    componentWillUnmount () {

        const {name} = this.props;

        SOCKETS[name].disconnect();
        delete SOCKETS[name];
    }

    render () {

        return false;
    }
}

Socket.displayName = 'Socket';

Socket.propTypes = {
    url    : PropTypes.string,
    name   : PropTypes.string,
    options: PropTypes.object
};

Socket.defaultProps = {
    url : '/',
    name: NAME
};

export default Socket;