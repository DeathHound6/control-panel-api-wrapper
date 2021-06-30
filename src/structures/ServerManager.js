const ControlPanel = require("../ControlPanel");

class ServerManager {
    /**
     * @param {ControlPanel} cp The ControlPanel client
     */
    constructor(cp) {
        this.control = cp;
    }

    /**
     * Get an array of all Server objects
     * @returns {Promise<object[]>}
     */
    async getAll() {
        return (await (await this.control._request("/servers", "GET")).json()).data;
    }

    /**
     * Return a single Server object for the specified Server
     * @param {String} id The external ID of the server
     * @returns {Promise<object>}
     */
    async getOne(id) {
        return (await this.control._request(`/servers/${id}`, "GET")).json();
    }

    /**
     * Suspend the provided server
     * @param {String} id The external ID of the server
     * @returns {Promise<object>}
     */
    async suspendOne(id) {
        return (await this.control._request(`/servers/${id}/suspend`, "PATCH")).json();
    }

    /**
     * Unsuspend the provided server
     * @param {String} id The external ID of the server
     * @returns {Promise<object>}
     */
    async unsuspendOne(id) {
        return (await this.control._request(`/servers/${id}/unsuspend`, "PATCH")).json();
    }

    /**
     * Delete the specified server
     * @param {String} id The external ID of the server
     * @returns {Promise<object>}
     */
    async deleteOne(id) {
        return (await this.control._request(`/servers/${id}`, "DELETE")).json();
    }
}

module.exports = ServerManager;