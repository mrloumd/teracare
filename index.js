// main entry point
require = require('esm')(module); // eslint-disable-line
// normal export so node knows what your main file is
module.exports = require('./src/bin/www');
