var express = require('express');
var RouterUsers = express.Router();
var { users } = require('../Database/DatabaseUsers.js').database;
RouterUsers.use(express.json());

RouterUsers.get('/', (req, res) => {
    res.send(users);
});

RouterUsers.get("/:email", (req, res) => {
    const user = users.find(u => u.email === req.params.email)

    if (!user) return res.sendStatus(404)

    res.json(user).send()
})

RouterUsers.get('/login/:email', (req, res) => {
    const email = req.params.email;
    const results = users.filter(user => user.email === email);
    if (results.length === 0) {
        return res.status(404).send(`Not found`);
    }
    res.send(JSON.stringify(results));
});

RouterUsers.get('/login/:email/:username', (req, res) => {
    const email = req.params.email;
    const username = req.params.username;
    const results = users.filter(user => user.email === email && user.username === username);
    if (results.length === 0) {
        return res.status(404).send("Not found")
    }
    res.send(JSON.stringify(results));

});
RouterUsers.get('/login/:email/:bio', (req, res) => {
    const email = req.params.email;
    const bio = req.params.bio;
    const results = users.filter(user => user.email === email && user.bio === bio);
    if (results.length === 0) {
        return res.status(404).send("Not found")
    }
    res.send(JSON.stringify(results));

});

RouterUsers.get('/login/:email/:username/:bio', (req, res) => {
    const email = req.params.email;
    const username = req.params.username;
    const bio = req.params.bio;
    const results = users.filter(user => user.email === email && user.username === username && user.bio === bio);
    if (results.length === 0) {
        return res.status(404).send("Not found")
    }
    res.send(JSON.stringify(results));
});

RouterUsers.post('/', (req, res) => {
    let newUser = req.body;
    users.push(newUser);
    res.send(JSON.stringify(users));
}
);
RouterUsers.patch('/:email', (req, res) => {
    const email = req.params.email
    if (!email) return res.sendStatus(401);
    let userUpt = req.body;

    for (const key of Object.keys(userUpt)) {
        if (!userUpt[key]) return res.send(401);
    }

    const index = users.findIndex(user => user.email === email);
    if (index == -1) {
        res.sendStatus(404);
    }
    Object.assign(users[index], userUpt);

    res.json(users[index]).status(200);
});

RouterUsers.delete('/:email', (req, res) => {
    const email = req.params.email;
    if (!email) return res.sendStatus(401);
    users = users.filter((user) => user.email !== email);
    res.sendStatus(200);
});
module.exports = RouterUsers;
