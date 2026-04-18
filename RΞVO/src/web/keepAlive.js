const express = require('express');

module.exports = (port = 3000) => {
    const app = express();
    app.get('/', (req, res) => res.send('? R?VO está activo'));
    app.listen(port, () => console.log(`?? Servidor keep-alive escuchando en puerto ${port}`));
};