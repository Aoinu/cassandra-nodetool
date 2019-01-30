exports.Nodetool = jest.fn().mockReturnValue({
    status: jest.fn().mockResolvedValue({
        'DC1': {
            'Rack1': {
                '127.0.0.1': {
                    hostId: '37a95876-2342-11e9-ab14-d663bd873d93',
                    fqdns: ['test1.host'],
                    datacenter: 'DC1',
                    rack: 'Rack1',
                    status: 'U',
                    state: 'N',
                    tokens: ['1', '4'],
                    load: '128 KiB',
                    ownership: 0.25,
                },
                '127.0.0.3': {
                    hostId: '37a95e3e-2342-11e9-ab14-d663bd873d93',
                    fqdns: [ 'test3.host' ],
                    datacenter: 'DC1',
                    rack: 'Rack1',
                    status: 'D',
                    state: 'N',
                    tokens: ['3', '6'],
                    load: '128 KiB',
                    ownership: 0.4,
                },
            },
            'Rack2': {
                '127.0.0.2': {
                    hostId: '37a95af6-2342-11e9-ab14-d663bd873d93',
                    fqdns: ['test2.host'],
                    datacenter: 'DC1',
                    rack: 'Rack2',
                    status: 'U',
                    state: 'J',
                    tokens: ['2', '5'],
                    load: '128 KiB',
                    ownership: 0.35,
                },
            },
        },
    }),
});