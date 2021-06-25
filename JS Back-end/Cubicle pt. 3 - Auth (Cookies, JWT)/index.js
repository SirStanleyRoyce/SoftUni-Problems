const app = require('express')();
const port = 3000;

start();

async function start() {
    require('./config/express')(app); //express, handlebars config
    await require('./config/db')(); //mongoose config
    app.use(require('cookie-parser')()); //cookie parser
    app.use(await require('./middlewares/auth')());
    app.use(require('./middlewares/storage')()) //initialize storage functions
    await require('./config/routes')(app); //routes config

    app.listen(port, console.log(`Listening on port ${port}`));
}
