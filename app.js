var express = require('express');
var app = express();
var { database } = require('./Database/DatabaseUsers.js');
var usersRouter = require('./Routes/users');
app.use('/api/users', usersRouter);
const RouterApi = express.Router();
app.use('/api', RouterApi);

app.get('/', (req, res) => {
    res.send(
        'Welcome to Minou enterprise'
    );
});

RouterApi.get('/', (req, res) => {
    res.send('Minou enterprise API');
});
const port = process.env.Port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${3000}...`)
});