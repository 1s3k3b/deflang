const Messages = {
    'UNEXPECTED_TOKEN': token => 'Unexpected token ' + token + ' in Deflang',
    'DUPLICATE_TOKENS': () => 'No duplicate tokens allowed',
    'CANNOT_REASSIGN': name => 'Cannot reassign variable ' + name,
    'NOT_DEFINED': name => name + ' is not defined',
    'NOT_FUNCTION': name => name + ' is not a function',
    'CANNOT_RESOLVE': (x, struct) => 'Cannot resolve ' + x + ' to ' + struct,
};

const makeError = BaseError => class DeflangError extends BaseError {
    constructor(type, ...keys) {
        super(Messages[type](...keys));
    }
};

module.exports = {
    SyntaxError: makeError(SyntaxError),
    TypeError: makeError(TypeError),
    ReferenceError: makeError(ReferenceError),
};