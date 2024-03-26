const express = require("express");
const app = express();
app.use(express.json());

// importing different router
const categories = require('./routes/categories');

// register router
app.use('/api/categories', categories);


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`The app is running on: http://localhost:${port}`);
});
