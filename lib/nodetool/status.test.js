jest.mock('../mbean/storage-service');
jest.mock('../mbean/endpoint-snitch-info');
const { Status } = require('./status');

describe('Status', () => {
    describe('async status(resovleIp, withTokens, withLoads, withOwnership)', () => {
        it('should resolve ring status', async () => {
            const status = new Status();
            const ringStatus = await status.status();
            const expectedStetus = {
                'DC1': {
                    'Rack1': {
                        '127.0.0.1': {
                            hostId: '37a95876-2342-11e9-ab14-d663bd873d93',
                            datacenter: 'DC1',
                            rack: 'Rack1',
                            status: 'U',
                            state: 'N',
                            tokens: ['1', '4'],
                            load: '128 KiB',
                            ownership: 0.3333,
                        },
                        '127.0.0.2': {
                            hostId: '37a95af6-2342-11e9-ab14-d663bd873d93',
                            datacenter: 'DC1',
                            rack: 'Rack1',
                            status: 'U',
                            state: 'J',
                            tokens: ['2', '5'],
                            load: '128 KiB',
                            ownership: 0.3333,
                        },
                        '127.0.0.3': {
                            hostId: '37a95e3e-2342-11e9-ab14-d663bd873d93',
                            datacenter: 'DC1',
                            rack: 'Rack1',
                            status: 'D',
                            state: 'N',
                            tokens: ['3', '6'],
                            load: '128 KiB',
                            ownership: 0.3333,
                        },
                    },
                },
            };
            expect(ringStatus).toEqual(expectedStetus);
        });
    });
});
