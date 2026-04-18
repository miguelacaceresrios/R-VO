const { searchVideo, getVideoInfo } = require('../music/youtube');
const queueManager = require('../music/queueManager');
const player = require('../music/player');

module.exports = {
    name: 'play',
    description: 'Reproduce una canción de YouTube',
    async execute(message, args) {
        if (!args.length) return message.reply('🎵 Escribe el nombre o enlace de una canción.');
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) return message.reply('🔇 Debes estar en un canal de voz.');

        const query = args.join(' ');
        let songInfo;
        // Si es URL válida de YouTube
        if (query.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/)) {
            songInfo = await getVideoInfo(query);
        } else {
            songInfo = await searchVideo(query);
        }
        if (!songInfo) return message.reply('❌ No encontré esa canción.');

        const song = {
            title: songInfo.title,
            url: songInfo.url,
            duration: songInfo.durationSeconds,
            requestedBy: message.author.tag
        };

        const guildId = message.guild.id;
        const serverQueue = queueManager.getQueue(guildId);

        if (!serverQueue) {
            // Crear nueva cola y empezar a reproducir
            queueManager.createQueue(guildId, voiceChannel, message.channel);
            queueManager.addSong(guildId, song);
            await player.play(guildId, queueManager.getQueue(guildId).songs[0]);
        } else {
            queueManager.addSong(guildId, song);
            message.reply(`✅ **${song.title}** añadida a la cola (posición ${serverQueue.songs.length})`);
        }
    }
};