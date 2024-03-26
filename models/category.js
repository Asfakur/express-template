const Joi = require("joi");
const mongoose = require("mongoose");

const MIN_LENGTH = 3;
const MAX_LENGTH = 100;

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: MIN_LENGTH,
        maxlength: MAX_LENGTH,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
    const schema = Joi.object({
        title: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
    });
    return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory
