const ControlPanel = require("../ControlPanel");
const Server = require("./Server");

class ServerManager {
    /**
     * @param {ControlPanel} cp The ControlPanel client
     */
    constructor(cp) {
        this.control = cp;
    }

    /**
     * Get an array of all Server objects
     * @returns {Promise<Server[]>}
     */
    async getAll() {
        const serverArray = (await (await this.control._request("/servers", "GET")).json()).data;
        const servers = [];
        for (const data of serverArray) {
            servers.push(new Server(data));
        }
        return servers;
    }

    /**
     * Return a single Server object for the specified Server
     * @param {String} id The external ID of the server
     * @returns {Promise<Server>}
     * @throws Error
     */
    async getOne(id) {
        const data = await (await this.control._request(`/servers/${id}`, "GET")).json();
        if (data.message) throw new Error(data.message);
        return new Server(data);
    }

    /**
     * Suspend the provided server
     * @param {String} id The external ID of the server
     * @returns {Promise<Server>}
     * @throws Error
     */
    async suspendOne(id) {
        const data = await (await this.control._request(`/servers/${id}/suspend`, "PATCH")).json();
        if (data.message) throw new Error(data.message);
        return new Server(data);
    }

    /**
     * Unsuspend the provided server
     * @param {String} id The external ID of the server
     * @returns {Promise<Server>}
     * @throws Error
     */
    async unsuspendOne(id) {
        const data = await (await this.control._request(`/servers/${id}/unsuspend`, "PATCH")).json();
        if (data.message) throw new Error(data.message);
        return new Server(data);
    }

    /**
     * Delete the specified server
     * @param {String} id The external ID of the server
     * @returns {Promise<Server>}
     * @throws Error
     */
    async deleteOne(id) {
        const data = await (await this.control._request(`/servers/${id}`, "DELETE")).json();
        if (data.message) throw new Error(data.message);
        return new Server(data);
    }
}

module.exports = ServerManager;