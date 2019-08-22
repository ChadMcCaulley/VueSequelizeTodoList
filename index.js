const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

// set up static folder
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(routes);

// begin running the app on the given port
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
})