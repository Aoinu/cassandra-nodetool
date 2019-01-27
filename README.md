# Cassandra Nodetool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/cassandra-nodetool.svg)](https://badge.fury.io/js/cassandra-nodetool)
[![david-dm](https://david-dm.org/Aoinu/cassandra-nodetool.svg)](https://david-dm.org/Aoinu/cassandra-nodetool)
[![CircleCI](https://circleci.com/gh/Aoinu/cassandra-nodetool.svg?style=svg)](https://circleci.com/gh/Aoinu/cassandra-nodetool)
[![codecov](https://codecov.io/gh/Aoinu/cassandra-nodetool/branch/master/graph/badge.svg)](https://codecov.io/gh/Aoinu/cassandra-nodetool)

Cassandra Nodetool on Node.js

## Requirements

- Node.js: `>=7.10.1`. (needs `async/await` support)
- Package: [`node-java`](https://github.com/joeferner/node-java), [`node-jmx`](https://github.com/zuazo/node-jmx)
  - OpenJDK: `8`.
  - node-gyp
    - python: `2.7.x`.
    - make
    - g++

## Installation

```
$ npm install cassandra-nodetool
```

or

```
$ yarn add cassandra-nodetool
```

[Dockerfile](https://gitlab.com/aoinu/cassandra-nodetool/blob/master/Dockerfile)

## CLI Usage examples

CLI is available via `jsnodetool`.

```
$ jsnodetool -h

usage: jsnodetool [-h] [-v] [-H HOST] [-P PORT] [-U USERNAME] [-PW PASSWORD]
                  {status} ...

Cassandra Nodetool on Node.js

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -H HOST, --host HOST  Hostname or IP address.
  -P PORT, --port PORT  JMX Port number.
  -U USERNAME, --username USERNAME
                        JMX Username.
  -PW PASSWORD, --password PASSWORD
                        JMX Password.

command:
  {status}
```

To fetch ring status:

```
$ jsnodetool status --skipTokens

{ datacenter1:
   { rack1:
      { '127.0.0.1':
         { hostId: '510e4833-317e-4d11-8590-fd1f849bafd8',
           datacenter: 'datacenter1',
           rack: 'rack1',
           status: 'U',
           state: 'N',
           load: '280.45 KiB',
           ownership: 1.0000048875808716 } } } }
```

## Module Usage Examples

```javascript
const { Nodetool } = require('cassandra-nodetool');

Nodetool({ host: '127.0.0.1', port: 7199, username: 'user', password: 'pass' })
    .status({ resolveIp: true })
    .then( ringStatus => console.log(ringStatus))
    .catch( err => console.error(err));
```
