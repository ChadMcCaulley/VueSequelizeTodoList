const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const {getMaxImportance, getMinImportance} = require("../../test");


router.get("/", (req, res) => {
    Todo.findAll()
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})
router.post("/", async (req, res) => {
    // Get the color and text from the request
    const color = req.body.color;
    const text = req.body.text;
    const addLocation = req.body.addLocation;

    // Find current max and min importance
    const maxImportance = await getMaxImportance();
    const minImportance = await getMinImportance();
    console.log(minImportance + ", " + maxImportance);
    // Add to top

    // Add to bottom

    // If there is not text provided, tell the frontend
    if (!text || text === "") res.send("Todos cannot be left blank");

    // Create the new todo 
    Todo
        .create({
            color,
            text
        })
        .then((todo) => {
            res.json(todo)
        })
        .catch(err => console.log(err));
    Todo.save();
});


module.exports = router;