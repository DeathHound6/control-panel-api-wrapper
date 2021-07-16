# ControlPanel.GG API Wrapper
An NPM module to aid in interacting with all ControlPanel.gg APIs

## Documentation
### ControlPanel
Properties
- apiURL: String
- token: String
- userManager: UserManager
- serverManager: ServerManager
- voucherManager: VoucherManager
### UserManager
Methods:
- getAll(): User[]
- getOne(id: String): User
- updateOne(id: String, newValues: { name?: String, email?: String, credits?: Number, server_limit?: Number, role?: String }): User
- deleteOne(id: String): User
### ServerManager
Methods:
- getAll(): Server[]
- getOne(id: String): Server
- suspendOne(id: String): Server
- unsuspendOne(id: String): Server
- deleteOne(id: String): Server
### VoucherManager
Methods:

### User
Properties
- id: Number
- name: String
- role: String
- credits: Number
- serverLimit: Number
- pterodactylID: Number
- avatar?: String
- email: String
- emailVerifiedAt?: String
- createdAt: String
- updatedAt: String
- ip: String
- lastSeen: String
- discordVerifiedAt?: String
### Server
Properties
- id: String
- name: String
- description: String
- suspended?: String
- identifier: String
- pterodactylID: Number
- ownerID: Number
- createdAt: String
- updatedAt: String
- product: Product
### Product
Properties
- id: String
- name: String
- description: String
- price: Number
- memory: Number
- cpu: Number
- swap: Number
- disk: Number
- io: Number
- databaseLimit: Number
- backupLimit: Number
- allocationLimit: Number
- createdAt: String
- updatedAt: String
- disabled: Number
### Voucher
Properties
- id: Number
- code: String
- memo: String
- credits: Number
- uses: Number
- expiresAt: String
- createdAt: String
- updatedAt: String
- used: Number
- status: String

## Example Usage
```js
const c = require("control-panel-api-wrapper");

const cp = new c("your cp api url", "your cp dashboard token");

async function updateUser(id) {
    console.log(await cp.userManager.updateOne(id, { name: "my new username" }));
}
updateUser(4);
```