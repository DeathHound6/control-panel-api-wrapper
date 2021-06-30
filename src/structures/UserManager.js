const ControlPanel = require("../ControlPanel");

class UserManager {
    /**
     * @param {ControlPanel} cp The ControlPanel client
     */
    constructor(cp) {
        this.control = cp;
    }

    /**
     * Get an array of all User objects
     * @returns {Promise<object[]>}
     */
    async getAll() {
        return (await (await this.control._request("/users", "GET")).json()).data;
    }

    /**
     * Return a single User object for the specified User
     * @param {String} id The ID of the user. This can be their CP ID, or Discord ID
     * @returns {Promise<object>}
     */
    async getOne(id) {
        return (await this.control._request(`/users/${id}`, "GET")).json();
    }

    /**
     * Update a single user to the new values provided
     * @param {String} id The ID of the user. This can be their CP ID, or Discord ID
     * @param {Object} newValues An object of the new values for the user
     * @param {String?} newValues.name The new name for the user
     * @param {String?} newValues.email The new email for the user
     * @param {Number?} newValues.credits The new number of credits for the user. Between 0 and 1000000
     * @param {Number?} newValues.server_limit The new server limit for the user. Between 0 and 1000000
     * @param {String?} newValues.role The new role for the user. One from `admin`, `mod`, `client`, `member`
     * @returns {Promise<object>}
     */
    async updateOne(id, newValues = {}) {
        // work around for patch request with form-data not updating the user
        newValues["_method"] = "patch";
        return (await this.control._request(`/users/${id}`, "POST", newValues)).json();
    }

    /**
     * Delete a single user
     * @param {String} id The ID of the user. This can be their CP ID, or Discord ID
     * @returns {Promise<object>}
     */
    async deleteOne(id) {
        return (await this.control._request(`/users/${id}`, "DELETE")).json();
    }
}

module.exports = UserManager;