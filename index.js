const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/courses', (req, res) => {
    res.send(['C', 'Java']);
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
})

app.listen(port, () => {
    console.log(`The app is running on: http://localhost:${port}`);
})