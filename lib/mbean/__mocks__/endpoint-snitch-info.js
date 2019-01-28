const { MBean } = require('./mbean');

class EndpointSnitchInfo extends MBean {
    constructor(jmxClient) {
        super({ jmxClient, mbean: 'org.apache.cassandra.db:type=EndpointSnitchInfo' });
        this.invoke = jest.fn((methodName, _params, _signature) => {
            switch(methodName) {
            case 'getDatacenter':
                return Promise.resolve('DC1');
            case 'getRack':
                return Promise.resolve('Rack1');
            default:
                return Promise.reject(new Error('Error'));
            }
        });
    }

    getDatacenter(endpoint = null) {
        if (endpoint != null) {
            return this.invoke('getDatacenter', [endpoint]);
        } else {
            return this.getAttribute('Datacenter');
        }
    }

    getRack(endpoint = null) {
        if (endpoint != null) {
            return this.invoke('getRack', [endpoint]);
        } else {
            return this.getAttribute('Rack');
        }
    }
}

exports.EndpointSnitchInfo = EndpointSnitchInfo;
