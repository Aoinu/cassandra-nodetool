const { toString } = require('../converter');
const { MBean } = require('./mbean');
class EndpointSnitchInfo extends MBean {
    constructor(jmxClient) {
        super({ jmxClient, mbean: 'org.apache.cassandra.db:type=EndpointSnitchInfo' });
    }

    getDatacenter(endpoint = null) {
        if (endpoint != null) {
            return this.invoke('getDatacenter', [endpoint]).then(toString);
        } else {
            return this.getAttribute('Datacenter').then(toString);
        }
    }

    getRack(endpoint = null) {
        if (endpoint != null) {
            return this.invoke('getRack', [endpoint]).then(toString);
        } else {
            return this.getAttribute('Rack').then(toString);
        }
    }
}

exports.EndpointSnitchInfo = EndpointSnitchInfo;
