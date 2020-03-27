const { parse, stringify } = require("../src");
const config = ':=,;"[]{}';
const log = (x, f, ...xs) => console.log(f(x, ...xs), "\n");

log({
    a: "b",
    c: "d",
    e: "f",
    g: [ "h", "i", { j: "k", l: ["m"] } ],
    n: { o: "p", q: ["r"] },
    s: "t",
    u: ["v", "w", ["x", { y: "z" }]]
}, stringify, config);
log("hi", stringify);
log(61, stringify)
/* log({
    a: "b",
    c: "d",
    e: "f",
    g: [ "h", "i", { j: "k", l: ["m"] } ],
    n: { o: "p", q: ["r"] },
    s: "t",
    u: ["v", "w", ["x", { y: "z" }]]
}, x => parse(stringify(x)), config); */
log(`${config}
"some string 123 [a, s, d, {f=\"g\"}]"
`, parse);
log(`_DEFAULT_
x:"hi"
x:["a", "b", {c="d" ;e=  "f"}, 4]
x
`, parse);
log(`${config}
[ "a", [   "c"  ], 8,"b", 123,{a="b";c="d";  e= "f"; g= "h"}]
`, parse);
log(`_DEFAULT_
{
  a="b";
  c= "d";
  e=["f", 10]
}
`, parse);
log(`_DEFAULT_
someVar10: "x"
someVar10: "y"
someVar10
`, parse);
try {
    log(`_DEFAULT_
False: 19
False
    `, parse)
} catch (e) {
    console.error(e.toString(), "\n");
}