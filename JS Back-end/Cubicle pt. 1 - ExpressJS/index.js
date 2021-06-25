const express = require('express');
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

async function start() {
    require('./config/express')(app);
    await require('./config/routes')(app);
}
start();

app.listen(config.port, console.log(`Listening on port ${config.port}`));