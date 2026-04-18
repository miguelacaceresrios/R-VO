const queueManager = require('../music/queueManager');

module.exports = {
    name: 'queue',
    description: 'Muestra la cola de canciones',
    async execute(message) {
        const guildId = message.guild.id;
        const serverQueue = queueManager.getQueue(guildId);
        if (!serverQueue || serverQueue.songs.length === 0) return message.reply('📭 La cola está vacía.');
        let list = '🎶 **Cola actual:**\n';
        serverQueue.songs.forEach((song, i) => {
            list += `${i+1}. ${song.title} (pedida por ${song.requestedBy})\n`;
        });
        message.reply(list);
    }
};