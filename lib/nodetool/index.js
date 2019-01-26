const { inspect } = require('util');
const { JMXClientFactory } = require('../jmx-client');
const { Status } = require('./status');

const Nodetool = {
    status(args) {
        const jmxClient = JMXClientFactory({
            host: args.host,
            port: args.port,
            username: args.username,
            password: args.password,
        });
        const nodeStatus = new Status(jmxClient);
        return nodeStatus.status(
            args.resolveIp, args.withTokens, args.withLoads, args.withOwnership
        );
    },
};
exports.Nodetool = Nodetool;

exports.NodetoolCLI = {
    async status(args) {
        const ringStatus = await Nodetool.status(args);
        process.stdout.write(inspect(ringStatus, {
            showHidden: false,
            depth: null,
        }) + '\n');
    },
};