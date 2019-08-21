const express = require("express");
const app = express();
const path = require('path')
const routes = require("./app");

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

// set up static folder
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(routes);

// site index
app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});


// END OF SITE ROUTES

// begin running the app on the given port
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})