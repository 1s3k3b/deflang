const { TypeError } = require('../errors/index.js');

module.exports = {
    escape: str => str.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&'),
    resolveArray: x => {
        if (Array.isArray(x)) return x;
        if (typeof x === 'string') return x.split('');
        if (typeof x === 'number') return Array.from({ length: x }, (_, i) => i);
        throw new TypeError('CANNOT_RESOLVE', x, 'an array');
    },
    resolveFn: x => {
        if (typeof x === 'function') return x;
        if (typeof x === 'string') return y => y[x];
        throw new TypeError('CANNOT_RESOLVE', x, 'a function');
    },
};