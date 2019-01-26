const { EventEmitter } = require('events');
const java = require('java');

class Client extends EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.invokeFn = jest.fn().mockReturnValueOnce('rack1');
        this.invoke = jest.fn((mbean, methodName, params, _signature, callbackFunc) => {
            if (mbean === 'org.apache.cassandra.db:type=EndpointSnitchInfo') {
                if (methodName === 'getRack') {
                    callbackFunc(this.invokeFn(params));
                } else if (methodName == 'Disconnect') {
                    this.emit('disconnect');
                } else {
                    this.emit('error', new Error('Invalid methodName'));
                }
            } else {
                this.emit('error', new Error('Invalid mbean'));
            }
        });

    }
    connect() {
        if (this.options.host === 'live.host') {
            this.emit('connect');
        } else {
            this.emit('error', new Error('Connection refused.'));
        }
    }
    disconnect() {
        this.emit('disconnect');
    }
    getAttribute(mbean, attribute, callbackFunc) {
        if (mbean === 'org.apache.cassandra.db:type=StorageService') {
            if (attribute === 'LiveNodes') {
                const list = java.newInstanceSync('java.util.ArrayList');
                list.addSync('123.456.789.101');
                callbackFunc(list);
            } else if (attribute == 'Disconnect') {
                this.emit('disconnect');
            } else {
                this.emit('error', new Error('Invalid attribute'));
            }
        } else {
            this.emit('error', new Error('Invalid mbean'));
        }
    }
    
}

exports.createClient = (options) => {
    return new Client(options);
};
