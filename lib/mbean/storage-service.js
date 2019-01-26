const { toArray, toMap } = require('../converter');
const { MBean } = require('./mbean');

class StorageService extends MBean {
    constructor(jmxClient) {
        super({ jmxClient, mbean: 'org.apache.cassandra.db:type=StorageService' });
    }

    getLiveNodes() {
        return this.getAttribute('LiveNodes').then(toArray);
    }

    getJoiningNodes() {
        return this.getAttribute('JoiningNodes').then(toArray);
    }

    getMovingNodes() {
        return this.getAttribute('MovingNodes').then(toArray);
    }

    getLeavingNodes() {
        return this.getAttribute('LeavingNodes').then(toArray);
    }

    getUnreachableNodes() {
        return this.getAttribute('UnreachableNodes').then(toArray);
    }

    getEndpointToHostId() {
        return this.getAttribute('EndpointToHostId').then(toMap);
    }

    getTokenToEndpoint() {
        return this.getAttribute('TokenToEndpointMap').then(toMap);
    }

    getTokens(endpoint = null, tokenToEndpointMap = null) {
        if (endpoint != null && tokenToEndpointMap != null) {
            return Promise.resolve(
                Object.keys(tokenToEndpointMap)
                    .filter(token => endpoint === tokenToEndpointMap[token])
            );
        } else {
            return this.getAttribute('Tokens').then(toArray);
        }
    }

    getLoadMap() {
        return this.getAttribute('LoadMap').then(toMap);
    }

    getOwnership() {
        return this.getAttribute('Ownership').then(toMap);
    }
}

exports.StorageService = StorageService;
