const fetch = require("node-fetch");
const formdata = require("form-data");
const ServerManager = require("./structures/ServerManager");
const UserManager = require("./structures/UserManager");

class ControlPanel {
    /**
     * @param {String} apiURL The url of your ControlPanel dashboard with `/api` appended to the end
     * @param {String} token The Bearer token of your ControlPanel dashboard
     */
    constructor(apiURL = "", token = "") {
        this.apiURL = apiURL;
        this.token = token;

        this.userManager = new UserManager(this);
        this.serverManager = new ServerManager(this);
    }

    /**
     * Send a request to the specified endpoint
     * @param {String} endpoint The resource being requested
     * @param {String} method The method of the request
     * @param {JSON} bodyJSON The body of the request
     * @returns {Promise<any>}
     */
    async _request(endpoint, method = "GET", bodyJSON = {}) {
        const body = new formdata();
        for await (const [name, value] of Object.entries(bodyJSON)) {
            body.append(name, value);
        }
        return await fetch(`${this.apiURL}${endpoint}`,
            {
                method,
                body: ["GET", "HEAD"].includes(method) ? null : body,
                headers: { AUTHORIZATION: `Bearer ${this.token}` }
            }
        );
    }
}

module.exports = ControlPanel;