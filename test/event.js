var React      = require('react/addons'),
    proxyquire = require('proxyquire'),
    jsdom      = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

var render = function (props, mock) {

    var Event = proxyquire('../src/event.js', {
        './socket': {
            socket: mock
        }
    });

    var container = document.createElement('div'),
        component = React.createElement(Event, props);

    React.render(component, container);

    return {
        unmount: function () {

            React.unmountComponentAtNode(container);
        }
    };
};

describe('The socket', function () {

    it('adds and removes an event listener to the default socket', function (done) {

        var props = {
            name    : 'notification',
            callback: function () {}
        };

        var on = function (name, callback) {

            (name).should.equal(props.name);
            (callback).should.equal(props.callback);
        };

        var off = function (name, callback) {

            (name).should.equal(props.name);
            (callback).should.equal(props.callback);
            done();
        };

        var mock = function (name) {

            (name).should.equal('default');

            return {
                on : on,
                off: off
            };
        };

        render(props, mock).unmount();
    });

    it('adds and removes an event listener to a named socket', function (done) {

        var props = {
            name    : 'notification',
            socket  : 'notification',
            callback: function () {}
        };

        var on = function (name, callback) {

            (name).should.equal(props.name);
            (callback).should.equal(props.callback);
        };

        var off = function (name, callback) {

            (name).should.equal(props.name);
            (callback).should.equal(props.callback);
            done();
        };

        var mock = function (name) {

            (name).should.equal(props.socket);

            return {
                on : on,
                off: off
            };
        };

        render(props, mock).unmount();
    });

    it('listens to events', function (done) {

        var data = {};

        var props = {
            name    : 'events',
            callback: function (response) {

                (response).should.equal(data);
                done();
            }
        };

        var on = function (name, callback) {

            callback(data);
        };

        var off = function () {};

        var mock = function () {

            return {
                on : on,
                off: off
            };
        };

        render(props, mock).unmount();
    });
});