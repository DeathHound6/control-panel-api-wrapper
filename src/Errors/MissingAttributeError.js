class MissingAttributeError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingAttributeError";
    }
}

module.exports = MissingAttributeError;