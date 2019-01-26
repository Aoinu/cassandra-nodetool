describe('JMXClient', () => {
    const { JMXClientFactory } = require('./jmx-client');
    it('should return client instance', () => {
        const client = JMXClientFactory({
            host: 'live.host',
        });
        expect(client.getAttribute).toBeDefined();
        expect(client.invoke).toBeDefined();
    });

    it('should get attribute', async () => {
        const client = JMXClientFactory({
            host: 'live.host',
        });
        const javaLiveNodes = await client.getAttribute('org.apache.cassandra.db:type=StorageService', 'LiveNodes');
        expect(javaLiveNodes.toArraySync).toBeDefined();
        const liveNodes = javaLiveNodes.toArraySync();
        expect(liveNodes.length).toBe(1);
        expect(liveNodes).toContain('123.456.789.101');
    });

    it('should reject when invalid attribute received', async () => {
        const client = JMXClientFactory({
            host: 'live.host',
        });
        expect.assertions(1);
        try {
            await client.getAttribute('org.apache.cassandra.db:type=StorageService', 'InvalidAttribute');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    it('should reject when connection lost', async () =>{
        const client = JMXClientFactory({
            host: 'live.host',
        });
        expect.assertions(2);
        try {
            await client.getAttribute('org.apache.cassandra.db:type=StorageService', 'Disconnect');
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe('JMX client has been disconnected.');
        }
    });

    it('should invoke method', async () => {
        const client = JMXClientFactory({
            host: 'live.host',
        });
        const mbean = 'org.apache.cassandra.db:type=EndpointSnitchInfo';
        const methodName = 'getRack';
        const params = ['param'];
        const rackName = await client.invoke(mbean, methodName, params);
        expect(rackName).toBe('rack1');
        expect(client.connection.invokeFn).toBeCalledWith(params);
    });

    it('should keep alive connection', async () => {
        const client = JMXClientFactory({
            host: 'live.host',
        });

        client.connectToMBeanServer = jest.fn(client.connectToMBeanServer);

        expect(client.connection).toBe(null);
        expect(client.connectToMBeanServer.mock.calls.length).toBe(0);
        await client.getAttribute('org.apache.cassandra.db:type=StorageService', 'LiveNodes');
        expect(client.connection).not.toBe(null);
        expect(client.connectToMBeanServer.mock.calls.length).toBe(1);
        await client.getAttribute('org.apache.cassandra.db:type=StorageService', 'LiveNodes');
        expect(client.connectToMBeanServer.mock.calls.length).toBe(1);
    });
});
