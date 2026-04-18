const queueManager = require('../music/queueManager');
const player = require('../music/player');

module.exports = {
    name: 'stop',
    description: 'Detiene la música y limpia la cola',
    async execute(message) {
        const guildId = message.guild.id;
        const serverQueue = queueManager.getQueue(guildId);
        if (!serverQueue) return message.reply('❌ No hay música activa.');
        await player.stop(guildId);
        queueManager.clearQueue(guildId);
        message.reply('🛑 Música detenida y bot desconectado.');
    }
};