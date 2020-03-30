const { writeFileSync, readFileSync } = require('fs');
const { toJSON, fromJSON } = require('../index.js');

module.exports = args => {
    if (`${args[0]}`.endsWith('.def') && `${args[1]}`.endsWith('.json')) {
        writeFileSync(
            args[1],
            toJSON(
                readFileSync(args[0])
                    .toString(),
            ),
        );
        return console.log(`Successfully transpiled ${args[0]} into ${args[1]}`);
    }
    if (`${args[0]}`.endsWith('.json') && `${args[1]}`.endsWith('.def')) {
        writeFileSync(
            args[1],
            fromJSON(
                readFileSync(args[0])
                    .toString(),
            ),
        );
        return console.log(`Successfully transpiled ${args[0]} into ${args[1]}`);
    }
    console.log(`Usage:

deflang <from>.def <to>.json
Converts a .def file to a .json file

deflang <from>.json <to>.def
Converts a .json file to a .def file

! Both arguments must end in either .def or .json for the CLI to work`);
};