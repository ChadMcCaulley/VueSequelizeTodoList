const express = require("express");
const app = express();
const path = require('path')
const db = require("./src/sqlite");

const PORT = process.env.PORT || 3000;

// set up static folder
app.use(express.static("static"));

// site index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})