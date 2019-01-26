#!/usr/bin/env node

const { ArgumentParser } = require('argparse');
const { NodetoolCLI } = require('./nodetool');

const parser = new ArgumentParser({
    version: '0.0.1',
    description: 'Cassandra Nodetool on Node.js',
});

parser.addArgument(
    ['-H', '--host'],
    {
        help: 'Hostname or IP address.',
        defaultValue: '127.0.0.1',
    }
);
parser.addArgument(
    ['-P', '--port'],
    {
        help: 'JMX Port number.',
        type: 'int',
        defaultValue: 7199,
    }
);
parser.addArgument(
    ['-U', '--username'],
    {
        help: 'JMX Username.',
    }
);
parser.addArgument(
    ['-PW', '--password'],
    {
        help: 'JMX Password.',
    }
);

const subparsers = parser.addSubparsers({
    title: 'command',
});
const parser_status = subparsers.addParser(
    'status',
);
parser_status.addArgument(
    ['-R', '--resolveIp'],
    {
        action: 'storeTrue',
        help: 'Provide information about the cluster, such as the state, load, and IDs.',
    }
);
parser_status.addArgument(
    ['--skipTokens'],
    {
        action: 'storeFalse',
        help: '',
        dest: 'withTokens',
    }
);
parser_status.setDefaults({
    handler: NodetoolCLI.status,
});

const args = parser.parseArgs();

if (args.handler != null) args.handler(args);
else parser.printUsage();
