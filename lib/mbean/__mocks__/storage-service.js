const { MBean } = require('./mbean');

class StorageService extends MBean {
    constructor(jmxClient) {
        super({ jmxClient, mbean: 'org.apache.cassandra.db:type=StorageService' });
    }

    getLiveNodes() {
        return Promise.resolve(['127.0.0.1', '127.0.0.2']);
    }

    getJoiningNodes() {
        return Promise.resolve(['127.0.0.2']);
    }

    getMovingNodes() {
        return Promise.resolve([]);
    }

    getLeavingNodes() {
        return Promise.resolve([]);
    }

    getUnreachableNodes() {
        return Promise.resolve(['127.0.0.3']);
    }

    getEndpointToHostId() {
        return Promise.resolve({
            '127.0.0.1': '37a95876-2342-11e9-ab14-d663bd873d93',
            '127.0.0.2': '37a95af6-2342-11e9-ab14-d663bd873d93',
            '127.0.0.3': '37a95e3e-2342-11e9-ab14-d663bd873d93',
        });
    }

    getTokenToEndpoint() {
        return Promise.resolve({
            '1': '127.0.0.1',
            '2': '127.0.0.2',
            '3': '127.0.0.3',
            '4': '127.0.0.1',
            '5': '127.0.0.2',
            '6': '127.0.0.3',
        });
    }

    getTokens(endpoint = null, tokenToEndpointMap = null) {
        if (endpoint != null && tokenToEndpointMap != null) {
            return Promise.resolve(
                Object.keys(tokenToEndpointMap)
                    .filter(token => endpoint === tokenToEndpointMap[token])
            );
        } else {
            return Promise.resolve(['1', '2', '3']);
        }
    }

    getLoadMap() {
        return Promise.resolve({
            '127.0.0.1': '128 KiB',
            '127.0.0.2': '128 KiB',
            '127.0.0.3': '128 KiB',
        });
    }

    getOwnership() {
        return Promise.resolve({
            '127.0.0.1': 0.3333,
            '127.0.0.2': 0.3333,
            '127.0.0.3': 0.3333,
        });
    }
}

exports.StorageService = StorageService;
