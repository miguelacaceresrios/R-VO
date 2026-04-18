const client = require('./bot');
const config = require('./config');
const keepAlive = require('./web/keepAlive');
const loadCommands = require('./commands');
const loadEvents = require('./events');

// Iniciar servidor web (para mantener vivo en Replit)
keepAlive(config.PORT);

// Cargar comandos y eventos
loadCommands(client);
loadEvents(client);

// Login
client.login(config.TOKEN);
