// Módulo singleton para manejar las colas por servidor
const queues = new Map(); // guildId -> { voiceChannel, textChannel, songs, connection, player }

module.exports = {
    getQueue(guildId) {
        return queues.get(guildId);
    },
    createQueue(guildId, voiceChannel, textChannel) {
        if (queues.has(guildId)) return queues.get(guildId);
        const newQueue = {
            voiceChannel,
            textChannel,
            songs: [],
            connection: null,
            player: null
        };
        queues.set(guildId, newQueue);
        return newQueue;
    },
    addSong(guildId, song) {
        const queue = queues.get(guildId);
        if (queue) {
            queue.songs.push(song);
        }
    },
    removeSong(guildId, index) {
        const queue = queues.get(guildId);
        if (queue && queue.songs[index]) {
            queue.songs.splice(index, 1);
        }
    },
    nextSong(guildId) {
        const queue = queues.get(guildId);
        if (queue && queue.songs.length > 1) {
            queue.songs.shift(); // elimina la actual
            return queue.songs[0] || null;
        } else if (queue && queue.songs.length === 1) {
            queue.songs.shift();
            return null;
        }
        return null;
    },
    clearQueue(guildId) {
        const queue = queues.get(guildId);
        if (queue) {
            queue.songs = [];
            if (queue.connection) queue.connection.destroy();
            queues.delete(guildId);
        }
    },
    setConnection(guildId, connection) {
        const queue = queues.get(guildId);
        if (queue) queue.connection = connection;
    },
    setPlayer(guildId, player) {
        const queue = queues.get(guildId);
        if (queue) queue.player = player;
    }
};
