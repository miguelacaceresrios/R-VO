module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`?  está online!`);
        client.user.setActivity('!play | 24/7', { type: 'LISTENING' });
    }
};
