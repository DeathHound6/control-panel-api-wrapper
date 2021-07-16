const ControlPanel = require("../ControlPanel");
const User = require("./User")

class UserManager {
    /**
     * @param {ControlPanel} cp The ControlPanel client
     */
    constructor(cp) {
        this.control = cp;
    }

    /**
     * Get an array of all User objects
     * @returns {Promise<User[]>}
     */
    async getAll() {
        const userArray = (await (await this.control._request("/users", "GET")).json()).data;
        const users = [];
        for (const data of userArray) {
            users.push(new User(data));
        }
        return users;
    }

    /**
     * Return a single User object for the specified User
     * @param {String} id The ID of the user. This can be their CP ID, or Discord ID
     * @returns {Promise<User>}
     */
    async getOne(id) {
        const data = await (await this.control._request(`/users/${id}`, "GET")).json();
        return new User(data);
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
     * @returns {Promise<User>}
     */
    async updateOne(id, newValues = {}) {
        // work around for patch request with form-data not updating the user
        newValues["_method"] = "patch";
        const data = await (await this.control._request(`/users/${id}`, "POST", newValues)).json();
        return new User(data);
    }

    /**
     * Delete a single user
     * @param {String} id The ID of the user. This can be their CP ID, or Discord ID
     * @returns {Promise<User>}
     */
    async deleteOne(id) {
        const data = await (await this.control._request(`/users/${id}`, "DELETE")).json();
        return new User(data);
    }
}

module.exports = UserManager;