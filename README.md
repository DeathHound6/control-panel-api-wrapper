# ControlPanel.GG API Wrapper
An NPM module to aid in interacting with all ControlPanel.gg APIs

## Documentation
### ControlPanel
Properties
- apiURL: String
- token: String
- userManager: UserManager
- serverManager: ServerManager
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

## Example Usage
```js
const c = require("control-panel-api-wrapper");

const cp = new c("your cp api url", "your cp dashboard token");

async function updateUser(id) {
    console.log(await cp.userManager.updateOne(id, { name: "my new username" }));
}
updateUser(4);
```