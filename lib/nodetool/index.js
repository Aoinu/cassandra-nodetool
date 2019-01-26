const { inspect } = require('util');
const { JMXClientFactory } = require('../jmx-client');
const { Status } = require('./status');

const Nodetool = (args) => {
    const jmxClient = JMXClientFactory({
        host: args.host,
        port: args.port,
        username: args.username,
        password: args.password,
    });
    return {
        status({ resolveIp, withTokens, withLoads, withOwnership }) {
            const nodeStatus = new Status(jmxClient);
            return nodeStatus.status(
                resolveIp, withTokens, withLoads, withOwnership
            );
        },
    };
    
};
exports.Nodetool = Nodetool;

exports.NodetoolCLI = {
    async status(args) {
        const ringStatus = await Nodetool(args).status(args);
        process.stdout.write(inspect(ringStatus, {
            showHidden: false,
            depth: null,
        }) + '\n');
    },
};