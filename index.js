"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use('/api/todos', require('./routes/todoRoute'));
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
db.sequelize.sync({ alter: true }).then(function () {
    app.listen(PORT, function () {
        console.log("Kanban-desk sedsrver running at port " + PORT);
    });
});
