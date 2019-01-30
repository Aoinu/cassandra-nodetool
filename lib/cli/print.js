const println = (text) => {
    process.stdout.write(text + '\n');
};
exports.println = println;

exports.printJSON = (obj, space) => {
    println(JSON.stringify(obj, null, space));
};