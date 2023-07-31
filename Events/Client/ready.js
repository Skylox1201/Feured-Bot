const { loadCommands } = require("../../Handlers/commandHandlers")

module.exports = {
    name:"ready",
    once:"true",
    execute(client){
        loadCommands(client);
        console.log("The Client is now ready!");
    }
}