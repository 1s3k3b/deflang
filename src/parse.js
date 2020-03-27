const escape = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parse = str => {
	str = `${str}`.trim();
	const [ defD, objD, arrS, objS, strD, arrO, arrC, objO, objC ] = str.startsWith('_DEFAULT_') ? ':=,;"[]{}' : str;
	str = str.substring(9);
	if (Array.from(new Set([arrO, arrC, objO, objC, strD, objS, arrS])).length !== 7) throw new SyntaxError('No duplicate tokens allowed');

	let res;
	const vars = new Map([
		// booleans
		['True', { value: true, m: false }],
		['False', { value: false, m: false }],
		// undefined, null, Infinity
		['Undefined', { value: undefined, m: false }],
		['Null', { value: null, m: false }],
		['Infinity', { value: Infinity, m: false }],
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
		s = s
			.trim()
			.replace(/\n/g, '');
		if (s.startsWith(strD) && s.endsWith(strD)) return s.slice(1, -1);
		if (s.startsWith(arrO) && s.endsWith(arrC)) {
			return s
				.slice(1, -1)
				.split(new RegExp(`\\s*${escape(arrS)}\\s*`))
				.map(_parse);
		}
		if (s.startsWith(objO) && s.endsWith(objC)) {
			return Object.fromEntries(
				s
					.slice(1, -1)
					.split(new RegExp(`\\s*${escape(objS)}\\s*`))
					.map(se =>
						[
							se.split(new RegExp(`\\s*${escape(objD)}\\s*`))[0].trim(),
							_parse(se.split(new RegExp(`\\s*${escape(objD)}\\s*`))[1]),
						],
					),
			);
		}
		if (vars.has(s)) return vars.get(s).value;
		if (/^\d+$/.test(s)) return Number(s);
		throw new SyntaxError('Unexpected token ' + s[0] + ' in Deflang');
	};

	str = str.replace(new RegExp(`^([^${escape(defD)}\\s]+)\\s*${escape(defD)}(.+)`, 'mg'), (_, n, v) => {
		if (vars.has(n.trim()) && !vars.get(n.trim()).m) throw new TypeError('Cannot reassign variable ' + n.trim());
		vars.set(n.trim(), { value: _parse(v), m: true });
		return '';
	});
	for (let line of str.split('\n')) {
		line = line.trim();
		if (!line) continue;
		if (line.startsWith(strD) && line.endsWith(strD)) {
			if (!res) return line.slice(1, -1);
			throw new SyntaxError('Unexpected token ' + strD + ' in Deflang ' + res.t);
		}
		if (line.startsWith(objO)) {
			if (line.endsWith(objC)) {
				if (!res) return _parse(line);
				res.add(_parse(line));
			}
			else if (!res) {return _parse(str);}
		}
		if (line.startsWith(arrO)) {
			if (line.endsWith(arrC)) {
				if (!res) return _parse(line);
				res.add(_parse(line));
			}
			else if (!res) {return _parse(str);}
		}
		if (vars.has(line)) {
			if (!res) return vars.get(line).value;
			res.add(vars.get(line).value);
		}
		if (/^\d+$/.test(line)) {
			if (!res) return Number(line);
			res.add(Number(line));
		}
	}
	return res;
};

module.exports = parse;
