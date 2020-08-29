import express = require('express');
import path = require('path');
import db = require('./models')

const app: express.Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());


app.use('/api/todos', require('./routes/todoRoute'))

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

db.sequelize.sync({alter: true}).then(() => {

    app.listen(PORT, () => {

        console.log(`Kanban-desk sedsrver running at port ${PORT}`)

    })
})