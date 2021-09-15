const ControlPanel = require("../ControlPanel");
const User = require("./User");
const MissingAttributeError = require("../Errors/MissingAttributeError");
const InvalidValueError = require("../Errors/InvalidValueError");

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
     * @throws Error
     */
    async getOne(id) {
        const data = await (await this.control._request(`/users/${id}`, "GET")).json();
        if (data.message) throw new Error(data.message);
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
     * @throws MissingAttributeError
     * @throws InvalidValueError
     * @throws Error
     */
    async updateOne(id, newValues = {}) {
        if (!newValues.name && !newValues.email && [null, undefined].includes(newValues.credits) && [null, undefined].includes(newValues.server_limit) && !newValues.role)
            throw new MissingAttributeError("At least one attribute is required");
        
        if (String(newValues.name).length < 4 || String(newValues.name).length > 30)
            throw new InvalidValueError("New user name should be between 4 and 30 characters");
        if (!(new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?: [\x01 -\x08\x0b\x0c\x0e -\x1f\x21\x23 -\x5b\x5d -\x7f] |\\[\x01 -\x09\x0b\x0c\x0e -\x7f]) * \")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])", "g")).test(newValues.email))
            throw new InvalidValueError("New user email must be a valid email address");
        if (newValues.credits < 0 || newValues.credits > 1000000)
            throw new InvalidValueError("New user credits should be between 0 and 1000000");
        if (newValues.server_limit < 0 || newValues.server_limit > 1000000)
            throw new InvalidValueError("New user server limit should be between 0 and 1000000");
        if (!["admin", "mod", "client", "member"].includes(String(newValues.role).toLowerCase()))
            throw new InvalidValueError("New user roles should be one from admin, mod, client or member");
        
        // work around for patch request with form-data not updating the user
        newValues["_method"] = "patch";
        const data = await (await this.control._request(`/users/${id}`, "POST", newValues)).json();
        if (data.message) throw new Error(data.message);
        return new User(data);
    }

    /**
     * Delete a single user
     * @param {String} id The ID of the user. This can be their CP ID, or Discord ID
     * @returns {Promise<User>}
     * @throws Error
     */
    async deleteOne(id) {
        const data = await (await this.control._request(`/users/${id}`, "DELETE")).json();
        if (data.message) throw new Error(data.message);
        return new User(data);
    }
}

module.exports = UserManager;