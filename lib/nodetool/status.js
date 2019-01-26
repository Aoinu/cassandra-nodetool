const { promisify } = require('util');
const reverse = promisify(require('dns').reverse);
const { StorageService } = require('../mbean/storage-service');
const { EndpointSnitchInfo } = require('../mbean/endpoint-snitch-info');

class Status {
    constructor(jmxClient) {
        this.storageService = new StorageService(jmxClient);
        this.endpointSnitchInfo = new EndpointSnitchInfo(jmxClient);
    }

    async status(
        resolveIp = false,
        withTokens = true,
        withLoads = true,
        withOwnership = true,
    ) {
        const [
            endpointToHostIdMap,
            liveNodes,
            joiningNodes,
            movingNodes,
            leavingNodes,
            unreachableNodes,
            tokenToEndpoint,
            loadMap,
            ownership,
        ] = await Promise.all([
            this.storageService.getEndpointToHostId(),
            this.storageService.getLiveNodes(),
            this.storageService.getJoiningNodes(),
            this.storageService.getMovingNodes(),
            this.storageService.getLeavingNodes(),
            this.storageService.getUnreachableNodes(),
            withTokens ? this.storageService.getTokenToEndpoint() : Promise.resolve(null),
            withLoads ? this.storageService.getLoadMap() : Promise.resolve(null),
            withOwnership ? this.storageService.getOwnership() : Promise.resolve(null),
        ]);

        const ringStatus = {};

        for(const endpoint in endpointToHostIdMap) {
            const [
                datacenter,
                rack,
            ] = await Promise.all([
                this.endpointSnitchInfo.getDatacenter(endpoint),
                this.endpointSnitchInfo.getRack(endpoint),
            ]);
            const nodeStatus = {
                hostId: endpointToHostIdMap[endpoint],
                datacenter,
                rack,
            };

            if (liveNodes.includes(endpoint)) {
                nodeStatus.status = 'U';
            } else if (unreachableNodes.includes(endpoint)) {
                nodeStatus.status = 'D';
            } else {
                nodeStatus.status = '?';
            }

            if (joiningNodes.includes(endpoint)) {
                nodeStatus.state = 'J';
            } else if (leavingNodes.includes(endpoint)) {
                nodeStatus.state = 'L';
            } else if (movingNodes.includes(endpoint)) {
                nodeStatus.state = 'M';
            } else {
                nodeStatus.state = 'N';
            }

            if (resolveIp) {
                const hostnames = await reverse(endpoint);
                if (hostnames.length > 0) {
                    nodeStatus.fqdn = hostnames;
                } else {
                    nodeStatus.fqdn = '?';
                }
            }
            if (withTokens) {
                nodeStatus.tokens = await this.storageService.getTokens(endpoint, tokenToEndpoint);
            }
            if (withLoads) {
                nodeStatus.load = loadMap[endpoint];
            }
            if (withOwnership) {
                for (const key in ownership) {
                    if (key.indexOf(endpoint) > -1) {
                        nodeStatus.ownership = ownership[key];
                        break;
                    }
                }
            }
            
            if (![].includes.call(ringStatus, datacenter)) {
                ringStatus[datacenter] = {};
                if (![].includes.call(ringStatus[datacenter], rack)) {
                    ringStatus[datacenter][rack] = {};
                }
            }
            ringStatus[datacenter][rack][endpoint] = nodeStatus;
        }
        return ringStatus;
    }
}

exports.Status = Status;
