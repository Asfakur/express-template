const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/test")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB"));


// importing different router
const categories = require('./routes/categories');

// register router
app.use('/api/categories', categories);


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`The app is running on: http://localhost:${port}`);
});
