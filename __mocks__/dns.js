exports.reverse = (ip, callback) => {
    switch(ip) {
    case '127.0.0.1':
        callback(null, ['test1.host']);
        break;
    case '127.0.0.2':
        callback(null, ['test2.host']);
        break;
    default:
        callback(new Error('error'), null);
        break;
    }
};
