jest.mock('../nodetool');
const spyStdout = jest.spyOn(process.stdout, 'write');
const { ringStatusReporter } = require('./ring-status-reporter');

describe('ringStatusReporter', () => {
    it('should format ring status', async () => {
        const expectedFormat = `Datacenter: DC1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address           Load        Tokens  Owns    Host ID                               Rack
UN  test1.host        128 KiB     2       25.0%   37a95876-2342-11e9-ab14-d663bd873d93  Rack1
DN  test3.host        128 KiB     2       40.0%   37a95e3e-2342-11e9-ab14-d663bd873d93  Rack1
UJ  test2.host        128 KiB     2       35.0%   37a95af6-2342-11e9-ab14-d663bd873d93  Rack2

`;
        let output = '';
        spyStdout.mockImplementation(text => output += text);
        await ringStatusReporter();
        expect(output).toBe(expectedFormat);
        spyStdout.mockReset();
        spyStdout.mockRestore();
    });
});
