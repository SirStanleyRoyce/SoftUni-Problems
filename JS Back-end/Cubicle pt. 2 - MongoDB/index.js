const app = require('express')();
const port = 3000;

start();

async function start() {
    require('./config/express')(app); //express, handlebars config
    await require('./config/db')(); //mongoose config
    app.use(require('./services/storage')); //storage service
    await require('./config/routes')(app); //routes config


    app.listen(port, console.log(`Listening on port ${port}`));
}
