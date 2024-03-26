const Joi = require('joi');
const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, title: "JavaScript" },
    { id: 2, title: "python" },
];

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('No course found with the given id');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required()
    })
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).send(result.error);
        return;
    }
    const course = {
        id: courses.length + 1,
        title: req.body.title
    };
    courses.push(course);
    res.status(201).send(course);
});

app.listen(port, () => {
    console.log(`The app is running on: http://localhost:${port}`);
});
