const path   = require('path'),
      glob   = require('glob'),
      tape   = require('tape'),
      report = require('faucet'),
      ignore = require('ignore-styles');

tape
    .createStream()
    .pipe(report())
    .pipe(process.stdout);

let files = process.argv.slice(2);

if (files.length < 1) {

    files = glob.sync('src/**/*.test.js');
}

files.map(file => require(path.resolve(__dirname, file)));