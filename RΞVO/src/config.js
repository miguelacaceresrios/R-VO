require('dotenv/config');

module.exports = {
    TOKEN: process.env.TOKEN,
    PREFIX: process.env.PREFIX || '!',
    PORT: process.env.PORT || 3000,
    COLORS: {
        PRIMARY: 0xFF69B4,
        ERROR: 0xFF0000,
        SUCCESS: 0x00FF00
    },
    EMOJIS: {
        PLAY: '??',
        SKIP: '??',
        STOP: '??',
        QUEUE: '??',
        ERROR: '?'
    }
};
