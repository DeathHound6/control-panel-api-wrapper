const ControlPanel = require("../ControlPanel");
const Voucher = require("./Voucher");

class VoucherManager {
    /**
     * @param {ControlPanel} cp The ControlPanel client
     */
    constructor(cp) {
        this.control = cp;
    }

    /**
     * Get an array of all Voucher objects
     * @returns {Promise<Voucher[]>}
     */
    async getAll() {
        const voucherArray = (await (await this.control._request("/vouchers", "GET")).json()).data;
        const vouchers = [];
        for (const data of voucherArray) {
            vouchers.push(new Voucher(data));
        }
        return vouchers;
    }

    /**
     * Return a single Voucher object for the specified Voucher
     * @param {Number} id The ID of the voucher
     * @returns {Promise<Voucher>}
     */
    async getOne(id) {
        const data = await (await this.control._request(`/vouchers/${id}`, "GET")).json();
        return new Voucher(data);
    }

    /**
     * Create a new voucher
     * @param {Object} values The details for the new voucher
     * @param {String?} values.memo A reminder of what the voucher gives
     * @param {String?} values.expires_at The date that the voucher will expire
     * @param {String} values.code The code used to redeem the voucher
     * @param {Number} values.uses How many times the voucher can be redeemed
     * @param {Number} values.credits The number of credits that will be given when redeemed
     * @returns {Promise<Voucher>}
     */
    async createOne(values = {}) {
        const data = await (await this.control._request(`/vouchers`, "POST", values, "urlencoded")).json();
        return new Voucher(data);
    }

    /**
     * Update a single voucher
     * @param {Number} id The id of the voucher to update
     * @param {Object} values The details for the new voucher
     * @param {String?} values.memo A reminder of what the voucher gives
     * @param {String?} values.expires_at The date that the voucher will expire
     * @param {String} values.code The code used to redeem the voucher
     * @param {Number} values.uses How many times the voucher can be redeemed
     * @param {Number} values.credits The number of credits that will be given when redeemed
     */
    async updateOne(id, values = {}) {
        const data = await (await this.control._request(`/vouchers/${id}`, "PATCH", values, "urlencoded")).json();
        return new Voucher(data);
    }

    /**
     * Delete the specified voucher
     * @param {Number} id The ID of the voucher
     * @returns {Promise<Voucher>}
     */
    async deleteOne(id) {
        const data = await (await this.control._request(`/vouchers/${id}`, "DELETE")).json();
        return new Voucher(data);
    }
}

module.exports = VoucherManager;