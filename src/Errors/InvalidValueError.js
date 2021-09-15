class InvalidValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidValueError";
    }
}

module.exports = InvalidValueError;