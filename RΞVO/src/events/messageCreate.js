const config = require('../config');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.PREFIX)) return;

        const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('? Hubo un error al ejecutar ese comando.');
        }
    }
};
