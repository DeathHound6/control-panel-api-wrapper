class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.memory = data.memory;
        this.cpu = data.cpu;
        this.swap = data.swap;
        this.disk = data.disk;
        this.io = data.io;
        this.databaseLimit = data.databases;
        this.backupLimit = data.backups;
        this.allocationLimit = data.allocations;
        this.createdAt = data.created_at;
        this.updatedAt = data.updatedAt;
        this.disabled = data.disabled;
    }
}

module.exports = Product;