const println = (text) => {
    process.stdout.write(text + '\n');
};
exports.println = println;

const printError = (err) => {
    process.stderr.write(err + '\n');
};
exports.printError = printError;

exports.printJSON = (obj, space) => {
    println(JSON.stringify(obj, null, space));
};