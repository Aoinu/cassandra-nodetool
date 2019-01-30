#!/usr/bin/env node

const { ArgumentParser } = require('argparse');
const { ringStatusReporter } = require('./ring-status-reporter');

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
parser.addArgument(
    ['--json'],
    {
        action: 'storeTrue',
        help: 'Print with JSON format.',
    }
);
parser.addArgument(
    ['--space'],
    {
        help: 'The number of indent space with JSON.',
        type: 'int',
    }
);

const subparsers = parser.addSubparsers({
    title: 'command',
});
const parser_status = subparsers.addParser(
    'status',
    {
        help: 'Provide information about the cluster, such as the state, load, and Host IDs.',
    }
);
parser_status.addArgument(
    ['-R', '--resolveIp'],
    {
        action: 'storeTrue',
        help: 'Resolve hostnames.',
    }
);
parser_status.addArgument(
    ['--skipTokens'],
    {
        action: 'storeFalse',
        help: 'Skip fetching token list.',
        dest: 'withTokens',
    }
);
parser_status.addArgument(
    ['--skipLoads'],
    {
        action: 'storeFalse',
        help: 'Skip fetching loads.',
        dest: 'withLoads',
    }
);
parser_status.addArgument(
    ['--skipOwns'],
    {
        action: 'storeFalse',
        help: 'Skip fetching ownerships.',
        dest: 'withOwnership',
    }
);
parser_status.setDefaults({
    handler: ringStatusReporter,
});

const args = parser.parseArgs();

if (args.handler != null) args.handler(args);
else parser.printUsage();
