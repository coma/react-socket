var React      = require('react/addons'),
    proxyquire = require('proxyquire'),
    jsdom      = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

var MockedSocket = proxyquire('../src/socket.js', {
    'socket.io-client': function () {

        return {
            disconnect: function () {}
        };
    }
});

var render = function (props, mock) {

    var Socket = mock ? proxyquire('../src/socket.js', {
        'socket.io-client': mock
    }) : MockedSocket;

    var container = document.createElement('div'),
        component = React.createElement(Socket, props);

    React.render(component, container);

    return {
        unmount: function () {

            React.unmountComponentAtNode(container);
        }
    };
};

describe('The socket', function () {

    it('connects a new io instance on mount and disconnects it on unmount', function (done) {

        var props = {
            url    : 'foo:9000',
            options: {
                reconnect: false
            }
        };

        render(props, function (url, options) {

            (url).should.equal(props.url);
            (options).should.equal(props.options);

            return {
                disconnect: done
            }
        }).unmount();
    });

    it('throws an error on socket name duplication', function () {

        var props = {
            url : 'foo:9000',
            name: 'foo'
        };

        render(props);

        (function () {

            render(props);

        }).should.throw('Another "foo" socket is already mounted.');
    });

    it('throws an error when trying to get an unknown socket', function () {

        (function () {

            MockedSocket.socket('faa');

        }).should.throw('There is no "faa" socket mounted.');
    });

    it('return a socket by its name and throws an removes it on unmount', function () {

        var props = {
            url : 'foo:9000',
            name: 'fin'
        };

        var rendered = render(props);

        MockedSocket.socket('fin').should.be.ok;

        rendered.unmount();

        (function () {

            MockedSocket.socket('fin');

        }).should.throw('There is no "fin" socket mounted.');
    });
});