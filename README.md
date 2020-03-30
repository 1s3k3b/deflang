# Deflang

Deflang is a superset of [JSON](https://www.json.org/) which allows customization of tokens.
Deflang has variables, comments, mathematical and logical operators, whitespace is allowed, duplicate tokens aren't allowed.

## Example

```
:=,;"[]{}#

# This is a comment!

myVariable: "Hello, World"

{
    someNumbers = [ PI, 8 / 2 ];
    someText = [ myVariable + "!" ]
}
```

compiles to

```json
{
    "someNumbers": [3.141592653589793, 4],
    "someText": ["Hello, World!"]
}
```

The first 9 characters (`:=,;"[]{}#` in the above example) define the tokens. `<default>` will be the configuration above, `:=,;"[]{}#`.

The **first** character defines the operator used to **define variables**. We set it to `:` in the example, so a variable declaration is `name:value`.

The **second** character defines the operator used to **seperate object keys and values**. We set it to `=` in the example, so an object key-value pair is `name=value`.

The **third** character defines the operator used to **seperate array elements**. We set it to `,` in the example, so 2 array elements seperated is `value,value`.

The **fourth** character defines the operator used to **seperate object key-value pairs**. We set it to `;` in the example, so 2 key-value pairs is `name=value;name=value`.

The **fifth** character defines the operator used to **open and close strings**. We set it to `"` in the example, so a string is `"text"`.

The **sixth** character defines the operator used to **open arrays**. We set it to `[` in the example, so an array beginning is `[value`.

The **seventh** character defines the operator used to **close arrays**. We set it to `]` in the example, so an array ending is `value]`.

The **eighth** character defines the operator used to **open objects**. We set it to `{` in the example, so an object beginning is `{name=value`.

The **nineth** character defines the operator used to **close objects**. We set it to `}` in the example, so an object ending is `name=value}`.

# Repository

To install the CLI from this repository
- `git clone https://github.com/1s3k3b/deflang.git` (or download the repo as a .zip)
- `cd deflang`
- `npm install . -g`

## JS interface

Exported methods:

- `parse(str: string): string | number | boolean | object | Array<T>` - parses a string

- `stringify(obj: string | number | boolean | object | Array<T>, config?: string = ':=,;"[]{}'): string` - converts a JS structure to Deflang

## CLI

deflang `<from>.def` `<to>.json` - Converts a `.def` file to a `.json` file

deflang `<from>.json` `<to>.def` - Converts a `.json` file to a `.def` file


! Both arguments must end in either `.def` or `.json` for the CLI to work