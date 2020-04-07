# Deflang

Deflang is a superset of [JSON](https://www.json.org/) which allows customization of tokens.
Deflang has variables, comments, mathematical and logical operators, whitespace is allowed, duplicate tokens aren't allowed.

## Example

```
<default>
numbers = range(1, 10)
evenNumbers = filter(numbers, isEven)
oddNumbers = filter(numbers, isOdd)

evenCount = length(evenNumbers)
oddCount = length(oddNumbers)

firstEven = first(evenNumbers)
lastEven = last(evenNumbers)

firstOdd = first(oddNumbers)
lastOdd = last(oddNumbers)

arr = ["There are ", evenCount, " even numbers and ", oddCount, " odd numbers from 1 to 10. The first and last even numbers are ", firstEven, " and ", lastEven, ". The first and last odd numbers are ", firstOdd, " and ", lastOdd, "."]
[ sum(arr), evenNumbers, oddNumbers ]
```

compiles to

```json
["There are 5 even numbers and 5 odd numbers from 1 to 10. The first and last even numbers are 2 and 10. The first and last odd numbers are 1 and 9.",[2,4,6,8,10],[1,3,5,7,9]]
```

# Repository

To install the CLI from this repository
- `git clone https://github.com/1s3k3b/deflang.git` (or download the repo as a .zip)
- `cd deflang`
- `npm install . -g`

## JS interface

Exported methods:

- `parse(str: string): string | number | boolean | object | Array<T>` - parses a string

- `stringify(obj: string | number | boolean | object | Array<T>, config?: string = '<default>'): string` - converts a JS structure to Deflang

## CLI

deflang `<from>.def` `<to>.json` - Converts a `.def` file to a `.json` file

deflang `<from>.json` `<to>.def` - Converts a `.json` file to a `.def` file


! Both arguments must end in either `.def` or `.json` for the CLI to work

# Built-in variables and methods

`True`, `False`, `NaN`, `Null`, `Undefined` - `true`, `false`, `NaN`, `null`, `undefined` in JavaScript