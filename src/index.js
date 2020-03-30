const parse = require('./parse.js');
const stringify = require('./stringify.js');

module.exports = {
    parse,
    stringify,
    toJSON: s => JSON.stringify(parse(s)),
    fromJSON: s => stringify(JSON.parse(s)),
};
