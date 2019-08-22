const express = require("express");
const router = express.Router();
const { Todo } = require.main.require("./src/sqlite");
const {getMinImportance} = require("../../test");


router.get("/", (req, res) => {
    Todo
        .findAll({order: [["importance", "DESC"]]})
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})

router.post("/", async (req, res) => {
    // Get the color and text from the request
    const text = req.body.text;
    let color = req.body.color;
    let importance;

    // Find current max and min importance
    importance = await getMinImportance() - 1;

    // If there is not text provided, tell the frontend
    if (!text || text === "") return res.send("Todos cannot be left blank");

    // Ensure that the color is valid. If not, set to default
    if (!color || color.length !== 7 || !(/#{1}[0-9A-Fa-f]{6}/g.test(color))) color = "#FFFFFF";

    // Create the new todo 
    Todo
        .create({text, color, importance})
        .then((todo) => {res.json(todo)})
        .catch(err => console.log(err));
});


module.exports = router;