import Errors from '../errors/';

const { TypeError } = Errors;

export const escape = (str: string): string => str.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&');
export const resolveArray = (x: any[] | string | number, n: boolean = true): any[] => {
    if (Array.isArray(x)) return x;
    if (typeof x === 'string') return x.split('');
    if (typeof x === 'number' && n) return Array.from({ length: x }, (_, i) => i);
    throw new TypeError('CANNOT_RESOLVE', x, 'an array');
};
export const resolveFn = (x: Function | string) => {
    if (typeof x === 'function') return x;
    if (typeof x === 'string') return (y: any) => y[x];
    throw new TypeError('CANNOT_RESOLVE', x, 'a function');
};