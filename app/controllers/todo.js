const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const {getMaxImportance, getMinImportance, ensureValidColor} = require("../../test");


router.get("/", (req, res) => {
    Todo
        .findAll({order: [["importance", "DESC"]]})
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})

router.post("/", async (req, res) => {
    // Get the color and text from the request
    const text = req.body.text;
    const addToTop = req.body.addToTop;
    const color = ensureValidColor(req.body.color);
    let importance;

    // Find current max and min importance
    addToTop ? importance = await getMaxImportance() + 1 : importance = await getMinImportance() - 1;

    // If there is not text provided, tell the frontend
    if (!text || text === "") return res.send("Todos cannot be left blank");

    // Create the new todo 
    Todo
        .create({text, color, importance})
        .then((todo) => {res.json(todo)})
        .catch(err => console.log(err));
});


module.exports = router;