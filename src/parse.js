const { SyntaxError, TypeError, ReferenceError } = require('./errors/index.js');
const stringify = require('./stringify.js');
const escape = str => str.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&');

const parse = str => {
    str = `${str}`.trim();
    if (str.startsWith('<default>')) str = '=:,;"[]{}#|&+-/*^><!' + str.slice(9);
    const [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ] = str;
    str = str.slice(20);
    if (Array.from(new Set([ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, lt, gt, not ])).length !== 20) {
        throw new SyntaxError('DUPLICATE_TOKENS');
    }

    const vars = new Map([
        // booleans
        ['True', { value: true, m: false }],
        ['False', { value: false, m: false }],
        // undefined, null, Infinity, NaN
        ['Undefined', { value: undefined, m: false }],
        ['Null', { value: null, m: false }],
        ['Infinity', { value: Infinity, m: false }],
        ['NaN', { value: NaN, m: false }],
        // math
        ['PI', { value: Math.PI, m: true }],
        ['Euler', { value: Math.E, m: true }],
        ['LN10', { value: Math.LN10, m: true }],
        ['LOG2E', { value: Math.LOG2E, m: true }],
        ['LOG10E', { value: Math.LOG10E, m: true }],
        ['SQRT1_2', { value: Math.SQRT1_2, m: true }],
        ['SQRT2', { value: Math.SQRT2, m: true }],
    ]);

    const _parse = s => {
        const exprPattern = `(${escape(strD)}.+${escape(strD)}|[\\w\\d${[ defD, objD, arrS, objS, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ].map(x => `\\${x}`).join('')}]+)`;
        s = s
            .trim()
            .replace(/\n/g, '');
        const regexes = [
            [
                new RegExp(`${exprPattern}\\s*${escape(or)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) || _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(and)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) && _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(sum)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) + _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(sub)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) - _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(mult)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) * _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(div)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) / _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(pow)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) ** _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(gt)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) > _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(lt)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) < _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            /* [
                new RegExp(`${exprPattern}\\s*${escape(defD)}${escape(defD)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) == _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
            [
                new RegExp(`${exprPattern}\\s*${escape(defD)}${escape(defD)}${escape(defD)}\\s*${exprPattern}`, 'g'),
                (_, a, b) => stringify(_parse(a) === _parse(b), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ], */
            [
                new RegExp(`${escape(not)}\\s*${exprPattern}`, 'g'),
                (_, a) => stringify(!_parse(a), [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC, com, or, and, sum, sub, div, mult, pow, gt, lt, not ]).slice(21),
            ],
        ];
        let _found = regexes.find(r => r[0].test(s));
        while (_found) {
            s = s.replace(..._found);
            _found = regexes.find(r => r[0].test(s));
        }
        if (
            s.startsWith(strD)
            && s.endsWith(strD)
            && (
                s
                    .slice(1, -1)
                    .includes(strD)
                    ? s.includes(`\\${strD}`)
                    : true
            )
        ) return s.slice(1, -1);
        if (s.startsWith(arrO) && s.endsWith(arrC)) {
            return s
                .slice(1, -1)
                .split(new RegExp(`\\s*${escape(arrS)}\\s*`))
                .filter(x => x)
                .map(_parse);
        }
        if (s.startsWith(objO) && s.endsWith(objC)) {
            return Object.fromEntries(
                s
                    .slice(1, -1)
                    .split(new RegExp(`\\s*${escape(objS)}\\s*`))
                    .filter(x => x)
                    .map(se =>
                        [
                            se.split(new RegExp(`\\s*${escape(objD)}\\s*`))[0].trim(),
                            _parse(se.split(new RegExp(`\\s*${escape(objD)}\\s*`))[1]),
                        ],
                    ),
            );
        }
        if (vars.has(s)) return vars.get(s).value;
        if (/^[\d.-]+$/.test(s)) return Number(s);
        if (/^\w+$/.test(s)) throw new ReferenceError('NOT_DEFINED', s);
        throw new SyntaxError('UNEXPECTED_TOKEN', s[0]);
    };

    str = str
        .replace(
            new RegExp(`${escape(com)}\\s*.+$`, 'mg'),
            '',
        )
        .replace(
            new RegExp(`^(\\w+)\\s*${escape(objD)}${escape(defD)}(.+)`, 'mg'),
            (_, n, v) => {
                if (vars.has(n.trim()) && !vars.get(n.trim()).m) {
                    throw new TypeError('CANNOT_REASSIGN', n.trim());
                }
                vars.set(n.trim(), { value: _parse(v.trim()), m: false });
                return '';
            },
        )
        .replace(
            new RegExp(`^(\\w+)\\s*${escape(defD)}(.+)`, 'mg'),
            (_, n, v) => {
                if (vars.has(n.trim()) && !vars.get(n.trim()).m) {
                    throw new TypeError('CANNOT_REASSIGN', n.trim());
                }
                vars.set(n.trim(), { value: _parse(v.trim()), m: true });
                return '';
            },
        );
    return _parse(str);
};

module.exports = parse;
