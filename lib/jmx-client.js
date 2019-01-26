const jmx = require('jmx');

class JMXClient {
    constructor(options) {
        this.options = options;
    }

    async connectToMBeanServer() {
        const connection = jmx.createClient(this.options);
        const executor = (resolve, reject) => {
            connection.once('error', err => {
                reject(err);
            });
            connection.once('connect', () => {
                resolve(connection);
            });
            connection.once('disconnect', () => {
                reject();
            });

            connection.connect();
        };
        return new Promise(executor);
    }

    async getAttribute(mbean, attribute) {
        const connection = await this.connectToMBeanServer();
        const executor = (resolve, reject) => {
            connection.prependOnceListener('disconnect', () => {
                reject(new Error('JMX client has been disconnected.'));
            });
            connection.prependOnceListener('error', err => {
                reject(err);
            });

            connection.getAttribute(mbean, attribute, (attrValue) => {
                resolve(attrValue);
            });
        };
        return new Promise(executor);
    }

    async invoke(mbean, methodName, params, signature) {
        const connection = await this.connectToMBeanServer();
        const executor = (resolve, reject) => {
            connection.prependOnceListener('disconnect', () => {
                reject(new Error('JMX client has been disconnected.'));
            });
            connection.prependOnceListener('error', err => {
                reject(err);
            });

            connection.invoke(mbean, methodName, params, signature, (returnedValue) => {
                resolve(returnedValue);
            });
        };
        return new Promise(executor);
    }
}

exports.JMXClient = JMXClient;
exports.JMXClientFactory = (options) => {
    return new JMXClient(options);
};
