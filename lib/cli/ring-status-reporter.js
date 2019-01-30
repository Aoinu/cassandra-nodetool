const { Nodetool } = require('../nodetool');
const { println } = require('./print');

exports.ringStatusReporter = async (args) => {
    const ringStatus = await Nodetool(args).status(args);
    for (const dc of Object.keys(ringStatus).sort()) {
        println(`Datacenter: ${dc}`);
        println('=======================');
        println('Status=Up/Down');
        println('|/ State=Normal/Leaving/Joining/Moving');
        println('--  Address           Load        Tokens  Owns    Host ID                               Rack');
        for (const rack of Object.keys(ringStatus[dc]).sort()) {
            for (const endpoint of Object.keys(ringStatus[dc][rack]).sort()) {
                const {
                    status, state, load, tokens, ownership, hostId, fqdns,
                } = ringStatus[dc][rack][endpoint];
                const
                    loadString = load != null ?
                        `${load}   `.slice(0, 10) : '--        ',
                    ownsString = ownership != null ?
                        `${(ownership*100).toFixed(1)}% `.slice(0, 6) : '--    ';
                let tokensString = '';
                if (tokens != null) {
                    if (tokens.length === 1) { // no vnode
                        tokensString = `${tokens[0]}         `.slice(0, 6);
                    } else {
                        tokensString = `${tokens.length}      `.slice(0, 6);
                    }
                } else {
                    tokensString = '--    ';
                }
                const address = (fqdns != null && fqdns.length > 0) ?
                    fqdns[0] : endpoint;
                println(
                    `${status}${state}  ` +
                    `${address}                 `.slice(0, 18) +
                    `${loadString}  ${tokensString}  ${ownsString}  ${hostId}  ${rack}`
                );

            }
        }
        println('');
    }
};