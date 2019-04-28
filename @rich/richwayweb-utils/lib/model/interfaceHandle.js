class InterfaceHandler {
    constructor(info = {}) {
        const node = info.node || {};
        this.node = {
            url: node.url || ``,
            mustLogin: node.mustLogin || false,
            method: node.method || `post`,
            fetchName: node.fetchName || ``,
            description: node.description || ``,
            config: node.config || {}
        };
        const cloud = (info.data || {}).cloud || {};
        const demo = (info.data || {}).demo || {};
        const nonForward = (info.data || {}).nonForward || false;
        this.data = {
            nonForward,
            cloud: {
                url: cloud.url || ``,
                method: cloud.method || `post`,
                postType: cloud.postType || `form`,
                accessToken: cloud.accessToken || ``,
                dataType: cloud.dataType || `json`,
                parameterForm: cloud.parameterForm || ``
            },
            demo: {
                url: demo.url || ``,
                handler: demo.handler || ``
            },
            triggerSocket: (info.data || {}).triggerSocket || ``
        };
        const handler = info.handler || {};
        this.handler = {
            url: handler.url || ``,
            processParametersHandler: handler.processParametersHandler || null,
            processDataHandler: handler.processDataHandler || null,
            processResultsHandler: handler.processResultsHandler || null
        };


        this.node.method = `post`;
        if (this.data.cloud.url && !this.node.url){
            this.node.url = `/${this.node.fetchName}${(this.data.cloud.url || ``).replace(/[\/{}]+/g, `_`)}`;
        }
    }
}

module.exports = info => new InterfaceHandler(info);
