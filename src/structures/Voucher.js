class Voucher {
    constructor(data) {
        this.id = data.id;
        this.code = data.code;
        this.memo = data.memo;
        this.credits = data.credits;
        this.uses = data.uses;
        this.expiresAt = data.expires_at;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        this.used = data.used;
        this.status = data.status;
    }
}

module.exports = Voucher;