class APIResponse {
    constructor(data = {},status, message) {
        this.code = 0;
        this.success = true;
        this.message = message??'success';
        this.status = 200;
        this.data = data;
    }

    static build() { return new APIResponse(); }

    setMsg(value) { this.msg = value; return this; };
    setCode(value) { this.code = value; return this; };
    setStatus(value) { this.status = value; return this; };
    setData(value) { this.data = value; return this; };
};

class APIError extends Error {
    constructor(status, message, code, data = {} ) {
        super(message);
        this.status = status ?? 500;
        this.error = {
            error : true,
            message : message,
            data : data
        };
        this.code = code ?? -1;
    };

    static build() { return new APIError(); }

    setMessage(value) { this.message = value; return this; };
    setCode(value) { this.code = value; return this; };
    setStatus(value) { this.status = value; return this; };
    setData(value) { this.error.data = value; return this; };
};

export { APIResponse , APIError };