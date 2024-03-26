const Joi = require("joi");
const express = require("express");
const router = express.Router();

const categories = [
    { id: 1, title: "Morning" },
    { id: 2, title: "Night" },
];

router.get("/", (req, res) => {
    res.send(categories);
});

router.post("/", (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = {
        id: categories.length + 1,
        name: req.body.title,
    };
    categories.push(category);
    res.send(category);
});

router.put("/:id", (req, res) => {
    const category = categories.find((c) => c.id === parseInt(req.params.id));
    if (!category)
        return res
            .status(404)
            .send("The category with the given ID was not found.");

    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    category.title = req.body.title;
    res.send(category);
});

router.delete("/:id", (req, res) => {
    const category = categories.find((c) => c.id === parseInt(req.params.id));
    if (!category)
        return res
            .status(404)
            .send("The category with the given ID was not found.");

    const index = categories.indexOf(category);
    categories.splice(index, 1);

    res.send(category);
});

router.get("/:id", (req, res) => {
    const category = categories.find((c) => c.id === parseInt(req.params.id));
    if (!category)
        return res
            .status(404)
            .send("The category with the given ID was not found.");
    res.send(category);
});

function validateCategory(category) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(category);
}

module.exports = router;
