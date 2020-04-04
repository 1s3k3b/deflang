const { parse, stringify } = require('../src');
const config = '=:,;"[]{}#|&+-/*^><!()';
const log = (x, f, ...xs) => console.log(f(x, ...xs), '\n');

log({
    a: 'b',
    c: 'd',
    e: 'f',
    g: [ 'h', 'i', { j: 'k', l: ['m'] } ],
    n: { o: 'p', q: ['r'] },
    s: 't',
    u: ['v', 'w', ['x', { y: 'z' }]],
}, stringify, config);
log('hi', stringify);
log(61, stringify);
/* log({
    a: "b",
    c: "d",
    e: "f",
    g: [ "h", "i", { j: "k", l: ["m"] } ],
    n: { o: "p", q: ["r"] },
    s: "t",
    u: ["v", "w", ["x", { y: "z" }]]
}, x => parse(stringify(x)), config); */
log(`<default>
a = False | True
b = "something" | 0
c = 0 | 0
d = True & 0
e = True & 1 & 1
f = !True
g = !0
# h = 4 == "4"
# i = 4 == 4
# j = 4 === 4
# k = 4 === "4"
# l = "a" === "a"
# m = "a" == "a"
[
    a, b, c, d, e, f, g
    #, f, g, h, i, j, k
]
`, parse);
log(`<default>
a = 1 + 1
b = 2 + 2 - 1
c = 8 / 2
d = 4 ^ 2
e = 42 > 2
f = 4 < 12
[a, b, c, d, e, f]
`, parse);
log(`${config}
# asd
"some string 123 [a, s, d, {f:\\"g\\"}]"
`, parse);
log(`<default>
# hey
x="hi"
x=["a", "b", {c:"d" ;e:  "f"}, 4]
x
`, parse);
log(`${config}
[ "a", [   "c"  ], 8,"b", 123,{a:"b";c:"d";  e: "f"; g: "h"}]
`, parse);
log(`<default>
{
  a:"b";
  c: "d";
  e:["f", 10]
}
`, parse);
log(`<default>
someVar10 = "x"
someVar10 = "y"
# hello
someVar10
`, parse);
log(`<default>
sqrt(16)
`, parse);
log(`<default>
a = [1, 2, 3, 1, 2, 10]
sum(a)
`, parse);
log(`<default>
f(x)=x+2
f(2)
`, parse);
try {
    log(`<default>
False=19 # haha yes
False
    `, parse);
} catch (e) {
    console.error(e.toString(), '\n');
}
try {
    log(`<default>
myVar:="b"
myVar="d"
myVar
    `, parse);
} catch (e) {
    console.error(e.toString(), '\n');
}
try {
    log(`<default>
a = "b"
c
    `, parse);
} catch (e) {
    console.error(e.toString(), '\n');
}