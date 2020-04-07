const stringify = (obj, [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC ] = '=:,;"[]{}#|&+-/*^><!()%') => {
    const recurse = x => stringify(x, [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC ]);
    if (obj === null) return 'Null';
    if (obj === undefined) return 'Undefined';
    if (isNaN(obj) && typeof obj === 'number') return 'NaN';
    if (['number', 'symbol'].includes(typeof obj)) return `${obj}`;
    if (typeof obj === 'boolean') return obj ? 'True' : 'False';
    if (typeof obj === 'string') return `${strD}${obj}${strD}`;
    if (Array.isArray(obj)) return `${arrO}${obj.map(recurse).join(arrS)}${arrC}`;
    if (typeof obj === 'object') return `${objO}${Object.entries(obj).map(([ key, val ]) => [ key, recurse(val) ].join(objD)).join(objS)}${objC}`;
    return 'Undefined';
};

module.exports = (obj, def = '=:,;"[]{}#|&+-/*^><!()%') =>
    `${
        (
            Array.isArray(def)
                ? def.join('')
                : String(def)
        )
            .slice(0, 23)
            .replace(/^<default>/, '=:,;"[]{}#|&+-/*^><!()%')
    }\n${stringify(obj, def)}`;