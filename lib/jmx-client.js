const jmx = require('jmx');

class JMXClient {
    constructor(options) {
        this.options = options;
        this.connection = null;
    }

    async connectToMBeanServer() {
        return new Promise((resolve, reject) => {
            this.connection = jmx.createClient(this.options);

            const onError = (err) => {
                this.connection.removeListener('connect', onConnect);
                reject(err);
            };
            const onConnect = () => {
                this.connection.removeListener('error', onError);
                resolve(this.connection);
            };
            const onDisconnect = () => {
                this.connection.removeAllListeners();
                this.connection = null;
                reject();
            };

            this.connection.once('error', onError);
            this.connection.once('connect', onConnect);
            this.connection.once('disconnect', onDisconnect);

            this.connection.connect();
        });
    }

    async getAttribute(mbean, attribute) {
        return new Promise(async (resolve, reject) => {
            if (this.connection == null) {
                this.conection = await this.connectToMBeanServer();
            }

            const onGetAttributeError = (err) => {
                this.connection.removeListener('disconnect', onGetAttributeDisconnect);
                reject(err);
            };
            const onGetAttributeDisconnect = () => {
                this.connection.removeListener('error', onGetAttributeError);
                reject(new Error('JMX client has been disconnected.'));
            };
            this.connection.prependOnceListener('disconnect', onGetAttributeDisconnect);
            this.connection.prependOnceListener('error', onGetAttributeError);

            this.connection.getAttribute(mbean, attribute, (attrValue) => {
                resolve(attrValue);
            });
        });
    }

    async invoke(mbean, methodName, params, signature) {
        return new Promise(async (resolve, reject) => {
            if (this.connection == null) {
                this.conection = await this.connectToMBeanServer();
            }

            const onInvokeError = (err) => {
                this.connection.removeListener('disconnect', onInvokeDisconnect);
                reject(err);
            };
            const onInvokeDisconnect = () => {
                this.connection.removeListener('error', onInvokeError);
                reject(new Error('JMX client has been disconnected.'));
            };
            this.connection.prependOnceListener('disconnect', onInvokeDisconnect);
            this.connection.prependOnceListener('error', onInvokeError);

            this.connection.invoke(mbean, methodName, params, signature, (returnedValue) => {
                resolve(returnedValue);
            });
        });
    }

}

exports.JMXClient = JMXClient;
exports.JMXClientFactory = (options) => {
    return new JMXClient(options);
};
