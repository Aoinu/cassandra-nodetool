class MBean {
    constructor({ jmxClient, mbean }) {
        this.client = jmxClient;
        this.mbean = mbean;
    }

    getAttribute(attribute) {
        return this.client.getAttribute(this.mbean, attribute);
    }

    invoke(methodName, params, signature) {
        return this.client.invoke(this.mbean, methodName, params, signature);
    }
}

exports.MBean = MBean;
