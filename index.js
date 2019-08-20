const express = require("express");
const app = express();
const db = require("./src/sqlite");

const PORT = process.env.PORT || 3000;

//app.use(express.static());

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})