class K8sFluentBitLogModel {

    constructor( arr ){
        /** @type {Array<K8sLogModel>} */
        this.logs = arr.map(item => new K8sLogModel(item));
    };
};

class K8sLogModel {
    constructor( {time, log, stream, kubernetes} ) {
        this.time = time;
        this.stream = stream;
        this.log = log;

        this.kubernetes = kubernetes;

        const { container_name, pod_name } = kubernetes;
        this.container_name = container_name;
        this.pod_name = pod_name;
    };

    static build() { return new K8sLogModel(); }

    setTime(value) { this.time = value; return this; }
    setLog(value) { this.log = value; return this; }
    setContainerName(value) { this.container_name = value; return this; }
    setPodName(value) { this.pod_name = value; return this; }

    setKubernetes(value) {
        this.kubernetes = value;
        if (value) {
            const { container_name, pod_name } = value;
            this.container_name = container_name;
            this.pod_name = pod_name;
        }
        return this;
    }

};

export { K8sFluentBitLogModel, K8sLogModel};