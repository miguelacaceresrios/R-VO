const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const queueManager = require('./queueManager');

module.exports = {
    async play(guildId, song) {
        const queue = queueManager.getQueue(guildId);
        if (!queue || !song) {
            // No hay más canciones, limpiar
            if (queue && queue.connection) queue.connection.destroy();
            queueManager.clearQueue(guildId);
            return;
        }

        // Unirse al canal de voz si no está conectado
        let connection = queue.connection;
        if (!connection) {
            connection = joinVoiceChannel({
                channelId: queue.voiceChannel.id,
                guildId: guildId,
                adapterCreator: queue.voiceChannel.guild.voiceAdapterCreator
            });
            queueManager.setConnection(guildId, connection);
        }

        const stream = ytdl(song.url, { filter: 'audioonly', quality: 'lowest' });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();
        queueManager.setPlayer(guildId, player);
        connection.subscribe(player);

        player.play(resource);
        player.on(AudioPlayerStatus.Idle, async () => {
            // Siguiente canción
            const nextSong = queueManager.nextSong(guildId);
            if (nextSong) {
                await this.play(guildId, nextSong);
            } else {
                // Terminó la cola
                const q = queueManager.getQueue(guildId);
                if (q && q.connection) q.connection.destroy();
                queueManager.clearQueue(guildId);
                if (queue.textChannel) queue.textChannel.send('🎵 Cola terminada. ¡Nos vemos!');
            }
        });
        player.on('error', err => {
            console.error(`Error en reproductor de ${guildId}:`, err);
            queue.textChannel.send('❌ Error al reproducir, saltando a la siguiente...');
            player.stop();
        });

        await queue.textChannel.send(`🎶 Reproduciendo: **${song.title}** (pedida por ${song.requestedBy})`);
    },

    async skip(guildId) {
        const queue = queueManager.getQueue(guildId);
        if (queue && queue.player) {
            queue.player.stop(); // esto dispara el evento Idle
        }
    },

    async stop(guildId) {
        const queue = queueManager.getQueue(guildId);
        if (queue && queue.player) {
            queue.player.stop();
        }
        if (queue && queue.connection) {
            queue.connection.destroy();
        }
        queueManager.clearQueue(guildId);
    }
};