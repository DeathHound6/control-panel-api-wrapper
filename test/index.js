const c = require("../src/ControlPanel");

const cp = new c("redacted api url", "redacted api token");


// USER TESTS
// -------------------------
//getUsers();
//getUser(4);
//updateUser(4, { server_limit: 4 });
//deleteUser(4);
async function getUsers() {
    console.log(await cp.userManager.getAll());
}
async function getUser(id) {
    console.log(await cp.userManager.getOne(id));
}
async function updateUser(id, newValues) {
    console.log(await cp.userManager.updateOne(id, newValues));
}
async function deleteUser(id) {
    console.log(await cp.userManager.deleteOne(id));
}


// SERVER TESTS
// -------------------------
//getServers();
//getServer("ZiSeHGEuybgC59VFw01h1");
//suspendServer("ZiSeHGEuybgC59VFw01h1");
//unsuspendServer("ZiSeHGEuybgC59VFw01h1");
//deleteServer("ZiSeHGEuybgC59VFw01h1");
async function getServers() {
    console.log(await cp.serverManager.getAll());
}
async function getServer(id) {
    console.log(await cp.serverManager.getOne(id));
}
async function suspendServer(id) {
    console.log(await cp.serverManager.suspendOne(id));
}
async function unsuspendServer(id) {
    console.log(await cp.serverManager.unsuspendOne(id));
}
async function deleteServer(id) {
    console.log(await cp.serverManager.deleteOne(id));
}