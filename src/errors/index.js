const Messages = {
    'UNEXPECTED_TOKEN': token => 'Unexpected token ' + token + ' in Deflang',
    'DUPLICATE_TOKENS': () => 'No duplicate tokens allowed',
    'CANNOT_REASSIGN': name => 'Cannot reassign variable ' + name,
};

const makeError = BaseError => class DeflangError extends BaseError {
    constructor(type, ...keys) {
        super(Messages[type](...keys));
    }
};

module.exports = {
    SyntaxError: makeError(SyntaxError),
    TypeError: makeError(TypeError),
};