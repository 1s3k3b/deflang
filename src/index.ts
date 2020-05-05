import parse from './parse';
import stringify from './stringify';

export default {
    parse,
    stringify,
    toJSON: (s: string) => JSON.stringify(parse(s)),
    fromJSON: (s: string) => stringify(JSON.parse(s)),
};
