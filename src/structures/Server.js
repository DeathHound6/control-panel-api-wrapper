const Product = require("./Product");

class Server {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.suspended = data.suspended;
        this.identifier = data.identifier;
        this.pterodactylID = data.pterodactyl_id;
        this.ownerID = data.user_id;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        this.product = new Product(data.product);
    }
}

module.exports = Server;