const queueManager = require('../music/queueManager');
const player = require('../music/player');

module.exports = {
    name: 'skip',
    description: 'Salta la canción actual',
    async execute(message) {
        const guildId = message.guild.id;
        const serverQueue = queueManager.getQueue(guildId);
        if (!serverQueue || serverQueue.songs.length === 0) return message.reply('❌ No hay nada que saltar.');
        await player.skip(guildId);
        message.reply('⏭️ Canción saltada.');
    }
};