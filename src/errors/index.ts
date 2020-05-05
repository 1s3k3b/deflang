const Messages: { [key: string]: (...args: string[]) => string } = {
    'UNEXPECTED_TOKEN': token => 'Unexpected token ' + token + ' in Deflang',
    'DUPLICATE_TOKENS': () => 'No duplicate tokens allowed',
    'CANNOT_REASSIGN': name => 'Cannot reassign variable ' + name,
    'NOT_DEFINED': name => name + ' is not defined',
    'NOT_FUNCTION': name => name + ' is not a function',
    'CANNOT_RESOLVE': (x, struct) => 'Cannot resolve ' + x + ' to ' + struct,
};

function makeError(BaseError: typeof Error) {
    class DeflangError extends BaseError {
        constructor(type: string, ...keys: any[]) {
            super(Messages[type](...keys));
        }
    }
    return DeflangError;
};

export default {
    SyntaxError: makeError(SyntaxError),
    TypeError: makeError(TypeError),
    ReferenceError: makeError(ReferenceError),
};