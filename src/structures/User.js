class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.role = data.role;
        this.credits = data.credits;
        this.serverLimit = data.server_limit;
        this.pterodactylID = data.pterodactyl_id;
        this.avatar = data.avatar;
        this.email = data.email;
        this.emailVerifiedAt = data.email_verified_at;
        this.discordVerifiedAt = data.discord_verified_at;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.ip = data.ip;
        this.lastSeen = data.last_seen;
    }
}

module.exports = User;