const { inspect } = require('util');
const { JMXClientFactory } = require('../jmx-client');
const { Status } = require('./status');

exports.Nodetool = {
    async status(args) {
        const jmxClient = JMXClientFactory({
            host: args.host,
            port: args.port,
            username: args.username,
            password: args.password,
        });
        const nodeStatus = new Status(jmxClient);
        const ringStatus = await nodeStatus.status(
            args.resolveIp, args.withTokens, args.withLoads, args.withOwnership
        );
        process.stdout.write(inspect(ringStatus, {
            showHidden: false,
            depth: null,
        }) + '\n');
    },
};