const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({extended: false}))

    app.use(express.static('static'));
};