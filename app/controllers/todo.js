const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const {getMaxImportance, getMinImportance} = require("../../test");


router.get("/", (req, res) => {
    Todo
        .findAll({order: [["importance", "DESC"]]})
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})
router.post("/", async (req, res) => {
    // Get the color and text from the request
    const color = req.body.color;
    const text = req.body.text;
    const addToTop = req.body.addToTop;
    let importance;

    // Find current max and min importance
    addToTop ? importance = Math.floor(await getMaxImportance()) + 1 : importance = Math.floor(await getMinImportance()) - 1;

    // If there is not text provided, tell the frontend
    if (!text || text === "") res.send("Todos cannot be left blank");

    // Create the new todo 
    Todo
        .create({
            color,
            text,
            importance
        })
        .then((todo) => {
            res.json(todo)
        })
        .catch(err => console.log(err));
});


module.exports = router;