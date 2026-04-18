const queueManager = require('../music/queueManager');

module.exports = {
    name: 'now',
    description: 'Muestra la canción que está sonando',
    async execute(message) {
        const guildId = message.guild.id;
        const serverQueue = queueManager.getQueue(guildId);
        if (!serverQueue || serverQueue.songs.length === 0) return message.reply('🎧 No hay nada sonando.');
        const current = serverQueue.songs[0];
        const embed = {
            title: '🎵 Sonando ahora',
            description: `**${current.title}**\nPedida por: ${current.requestedBy}`,
            url: current.url,
            color: 0xFF69B4
        };
        message.reply({ embeds: [embed] });
    }
};